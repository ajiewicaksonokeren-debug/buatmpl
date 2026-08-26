import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/adminGuard";
import { prisma } from "@/lib/prisma";

const prizeSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(500).optional(),
  weight: z.number().int().min(1),
  pointsValue: z.number().int().min(0),
  stock: z.number().int().min(0).nullable().optional(),
});

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = prizeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Data hadiah spin tidak valid." }, { status: 400 });
  }

  const prize = await prisma.spinPrize.create({ data: parsed.data });
  return NextResponse.json(prize, { status: 201 });
}
