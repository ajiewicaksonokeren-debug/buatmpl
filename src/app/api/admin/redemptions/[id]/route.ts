import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/adminGuard";
import { prisma } from "@/lib/prisma";

const updateSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "FULFILLED"]),
  adminNote: z.string().max(500).optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }
  const { status, adminNote } = parsed.data;

  const updated = await prisma.$transaction(async (tx) => {
    const existing = await tx.redemptionRequest.findUniqueOrThrow({
      where: { id },
      include: { rewardItem: true },
    });

    if (status === "REJECTED" && existing.status !== "REJECTED") {
      await tx.user.update({
        where: { id: existing.userId },
        data: { pointsBalance: { increment: existing.rewardItem.pointsCost } },
      });
      await tx.pointsLedgerEntry.create({
        data: {
          userId: existing.userId,
          amount: existing.rewardItem.pointsCost,
          reason: "ADMIN_ADJUST",
          note: `Refund penukaran ditolak: ${existing.rewardItem.name}`,
        },
      });
      if (existing.rewardItem.stock !== null) {
        await tx.rewardItem.update({
          where: { id: existing.rewardItemId },
          data: { stock: { increment: 1 } },
        });
      }
    }

    return tx.redemptionRequest.update({
      where: { id },
      data: { status, adminNote },
    });
  });

  return NextResponse.json(updated, { status: 200 });
}
