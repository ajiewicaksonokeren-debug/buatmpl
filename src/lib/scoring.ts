import { prisma } from "@/lib/prisma";
import { PredictionResult, LedgerReason, MatchStatus } from "@prisma/client";

export const POINTS_EXACT = 100;
export const POINTS_WINNER = 30;
export const TICKETS_EXACT = 1;

/**
 * Scores every pending prediction for a match once the real result is known,
 * crediting points/tickets via the ledger inside one transaction.
 */
export async function scoreMatch(matchId: string, homeScore: number, awayScore: number) {
  return prisma.$transaction(async (tx) => {
    const match = await tx.match.update({
      where: { id: matchId },
      data: { homeScore, awayScore, status: MatchStatus.FINISHED },
    });

    const predictions = await tx.prediction.findMany({
      where: { matchId, result: PredictionResult.PENDING },
    });

    const actualWinner =
      homeScore === awayScore ? "DRAW" : homeScore > awayScore ? "HOME" : "AWAY";

    for (const pred of predictions) {
      const predWinner =
        pred.predHomeScore === pred.predAwayScore
          ? "DRAW"
          : pred.predHomeScore > pred.predAwayScore
          ? "HOME"
          : "AWAY";

      const isExact =
        pred.predHomeScore === homeScore && pred.predAwayScore === awayScore;
      const isWinnerOnly = !isExact && predWinner === actualWinner;

      let result: PredictionResult = PredictionResult.WRONG;
      let points = 0;
      let tickets = 0;

      if (isExact) {
        result = PredictionResult.EXACT;
        points = POINTS_EXACT;
        tickets = TICKETS_EXACT;
      } else if (isWinnerOnly) {
        result = PredictionResult.CORRECT_WINNER;
        points = POINTS_WINNER;
      }

      await tx.prediction.update({
        where: { id: pred.id },
        data: { result, pointsAwarded: points, ticketAwarded: tickets },
      });

      if (points > 0) {
        await tx.pointsLedgerEntry.create({
          data: {
            userId: pred.userId,
            amount: points,
            reason: isExact ? LedgerReason.PREDICTION_EXACT : LedgerReason.PREDICTION_WINNER,
            note: `Prediksi pertandingan ${matchId}`,
          },
        });
      }

      if (points > 0 || tickets > 0) {
        await tx.user.update({
          where: { id: pred.userId },
          data: {
            pointsBalance: { increment: points },
            ticketBalance: { increment: tickets },
          },
        });
      }
    }

    return match;
  });
}
