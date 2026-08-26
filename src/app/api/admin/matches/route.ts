import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/adminGuard";
import { prisma } from "@/lib/prisma";

const matchSchema = z.object({
  homeTeamId: z.string().min(1),
  awayTeamId: z.string().min(1),
  week: z.string().optional(),
  startTime: z.string().datetime(),
  lockTime: z.string().datetime(),
});

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = matchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Data pertandingan tidak valid." }, { status: 400 });
  }

  const { homeTeamId, awayTeamId, week, startTime, lockTime } = parsed.data;
  if (homeTeamId === awayTeamId) {
    return NextResponse.json({ error: "Tim home dan away harus berbeda." }, { status: 400 });
  }

  const match = await prisma.match.create({
    data: {
      homeTeamId,
      awayTeamId,
      week,
      startTime: new Date(startTime),
      lockTime: new Date(lockTime),
    },
  });

  return NextResponse.json(match, { status: 201 });
}
