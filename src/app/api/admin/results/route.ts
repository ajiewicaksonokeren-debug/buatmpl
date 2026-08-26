import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/adminGuard";
import { scoreMatch } from "@/lib/scoring";

const resultSchema = z.object({
  matchId: z.string().min(1),
  homeScore: z.number().int().min(0).max(20),
  awayScore: z.number().int().min(0).max(20),
});

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = resultSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Data hasil tidak valid." }, { status: 400 });
  }

  const { matchId, homeScore, awayScore } = parsed.data;

  try {
    const match = await scoreMatch(matchId, homeScore, awayScore);
    return NextResponse.json(match, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal memproses hasil pertandingan." }, { status: 500 });
  }
}
