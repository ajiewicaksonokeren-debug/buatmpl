import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const redeemSchema = z.object({
  rewardItemId: z.string().min(1),
  contactInfo: z.string().min(5).max(300),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Harus login." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = redeemSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Data tidak valid. Sertakan kontak (WA/email) yang aktif." },
      { status: 400 }
    );
  }

  const { rewardItemId, contactInfo } = parsed.data;

  try {
    const request = await prisma.$transaction(async (tx) => {
      const item = await tx.rewardItem.findUniqueOrThrow({ where: { id: rewardItemId } });
      if (!item.active) throw new Error("ITEM_INACTIVE");
      if (item.stock !== null && item.stock <= 0) throw new Error("OUT_OF_STOCK");

      const user = await tx.user.findUniqueOrThrow({ where: { id: session.user.id } });
      if (user.pointsBalance < item.pointsCost) throw new Error("INSUFFICIENT_POINTS");

      await tx.user.update({
        where: { id: user.id },
        data: { pointsBalance: { decrement: item.pointsCost } },
      });

      await tx.pointsLedgerEntry.create({
        data: {
          userId: user.id,
          amount: -item.pointsCost,
          reason: "REDEMPTION",
          note: `Tukar poin: ${item.name}`,
        },
      });

      if (item.stock !== null) {
        await tx.rewardItem.update({
          where: { id: item.id },
          data: { stock: { decrement: 1 } },
        });
      }

      return tx.redemptionRequest.create({
        data: {
          userId: user.id,
          rewardItemId: item.id,
          contactInfo,
        },
      });
    });

    return NextResponse.json(request, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "UNKNOWN";
    const map: Record<string, string> = {
      ITEM_INACTIVE: "Hadiah ini sudah tidak tersedia.",
      OUT_OF_STOCK: "Stok hadiah habis.",
      INSUFFICIENT_POINTS: "Poin kamu tidak cukup.",
    };
    return NextResponse.json({ error: map[message] ?? "Gagal menukar poin." }, { status: 400 });
  }
}
