import { prisma } from "@/lib/prisma";

export class NoTicketError extends Error {}
export class NoPrizeAvailableError extends Error {}

/**
 * Spends one ticket for a guaranteed-win spin: every spin awards a prize
 * drawn by weight from the active/in-stock pool. There is no losing outcome.
 */
export async function spinWheel(userId: string) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({ where: { id: userId } });
    if (user.ticketBalance < 1) {
      throw new NoTicketError("Tiket tidak cukup.");
    }

    const prizes = await tx.spinPrize.findMany({
      where: { active: true, OR: [{ stock: null }, { stock: { gt: 0 } }] },
    });

    if (prizes.length === 0) {
      throw new NoPrizeAvailableError("Belum ada hadiah tersedia, coba lagi nanti.");
    }

    const totalWeight = prizes.reduce((sum, p) => sum + p.weight, 0);
    let roll = Math.random() * totalWeight;
    let chosen = prizes[prizes.length - 1];
    for (const prize of prizes) {
      if (roll < prize.weight) {
        chosen = prize;
        break;
      }
      roll -= prize.weight;
    }

    await tx.user.update({
      where: { id: userId },
      data: { ticketBalance: { decrement: 1 } },
    });

    if (chosen.stock !== null) {
      await tx.spinPrize.update({
        where: { id: chosen.id },
        data: { stock: { decrement: 1 } },
      });
    }

    const spinResult = await tx.spinResult.create({
      data: { userId, prizeId: chosen.id },
      include: { prize: true },
    });

    if (chosen.pointsValue > 0) {
      await tx.pointsLedgerEntry.create({
        data: {
          userId,
          amount: chosen.pointsValue,
          reason: "SPIN_REWARD",
          note: `Hadiah spin: ${chosen.name}`,
        },
      });
      await tx.user.update({
        where: { id: userId },
        data: { pointsBalance: { increment: chosen.pointsValue } },
      });
    }

    return spinResult;
  });
}
