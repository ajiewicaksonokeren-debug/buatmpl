import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const predictSchema = z.object({
  matchId: z.string().min(1),
  predHomeScore: z.number().int().min(0).max(20),
  predAwayScore: z.number().int().min(0).max(20),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Harus login." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = predictSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Data prediksi tidak valid." }, { status: 400 });
  }

  const { matchId, predHomeScore, predAwayScore } = parsed.data;

  const match = await prisma.match.findUnique({ where: { id: matchId } });
  if (!match) {
    return NextResponse.json({ error: "Pertandingan tidak ditemukan." }, { status: 404 });
  }
  if (new Date() >= match.lockTime || match.status !== "SCHEDULED") {
    return NextResponse.json(
      { error: "Prediksi sudah ditutup untuk pertandingan ini." },
      { status: 400 }
    );
  }

  const prediction = await prisma.prediction.upsert({
    where: { userId_matchId: { userId: session.user.id, matchId } },
    update: { predHomeScore, predAwayScore },
    create: {
      userId: session.user.id,
      matchId,
      predHomeScore,
      predAwayScore,
    },
  });

  return NextResponse.json(prediction, { status: 200 });
}
