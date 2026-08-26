import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/adminGuard";
import { prisma } from "@/lib/prisma";

const playerSchema = z.object({
  name: z.string().min(2).max(80),
  teamId: z.string().min(1),
  photoUrl: z.string().url(),
});

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = playerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Data pemain tidak valid." }, { status: 400 });
  }

  const player = await prisma.player.create({ data: parsed.data });
  return NextResponse.json(player, { status: 201 });
}
