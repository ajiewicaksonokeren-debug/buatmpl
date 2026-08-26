import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const POINTS_PLAYER_GUESS = 40;

export class NoChallengeAvailableError extends Error {}
export class InvalidChallengeError extends Error {}
export class AlreadyAnsweredError extends Error {}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Picks a player the user hasn't been challenged on yet, builds a 4-choice
 * multiple choice question, and records a pending PlayerGuess row so the
 * correct answer is never sent to the client (only the opaque attempt id is).
 */
export async function getNextChallenge(userId: string) {
  // A couple of retries covers the rare case where a concurrent request
  // (e.g. a double click) already claimed the same player for this user.
  for (let attempt = 0; attempt < 3; attempt++) {
    const eligible = await prisma.player.findMany({
      where: { active: true, guesses: { none: { userId } } },
    });
    if (eligible.length === 0) throw new NoChallengeAvailableError();

    const target = eligible[Math.floor(Math.random() * eligible.length)];

    const otherPlayers = await prisma.player.findMany({
      where: { active: true, id: { not: target.id } },
      take: 20,
    });
    const distractors = shuffle(otherPlayers).slice(0, 3);
    const choices = shuffle([target, ...distractors]).map((p) => ({ id: p.id, name: p.name }));

    try {
      const quizAttempt = await prisma.playerGuess.create({
        data: { userId, playerId: target.id },
      });
      return { attemptId: quizAttempt.id, photoUrl: target.photoUrl, choices };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        continue;
      }
      throw err;
    }
  }
  throw new NoChallengeAvailableError();
}

export async function submitGuess(userId: string, attemptId: string, chosenPlayerId: string) {
  return prisma.$transaction(async (tx) => {
    const attempt = await tx.playerGuess.findUnique({ where: { id: attemptId } });
    if (!attempt || attempt.userId !== userId) throw new InvalidChallengeError();
    if (attempt.correct !== null) throw new AlreadyAnsweredError();

    const correctPlayer = await tx.player.findUniqueOrThrow({ where: { id: attempt.playerId } });
    const isCorrect = attempt.playerId === chosenPlayerId;
    const points = isCorrect ? POINTS_PLAYER_GUESS : 0;

    await tx.playerGuess.update({
      where: { id: attemptId },
      data: { correct: isCorrect, pointsAwarded: points },
    });

    if (points > 0) {
      await tx.pointsLedgerEntry.create({
        data: {
          userId,
          amount: points,
          reason: "PLAYER_GUESS",
          note: `Tebak pemain benar: ${correctPlayer.name}`,
        },
      });
      await tx.user.update({
        where: { id: userId },
        data: { pointsBalance: { increment: points } },
      });
    }

    return { correct: isCorrect, pointsAwarded: points, correctPlayerName: correctPlayer.name };
  });
}
