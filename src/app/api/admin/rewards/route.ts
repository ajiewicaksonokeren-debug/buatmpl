import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/adminGuard";
import { prisma } from "@/lib/prisma";

const rewardSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(500).optional(),
  category: z.string().min(2).max(50),
  pointsCost: z.number().int().min(1),
  stock: z.number().int().min(0).nullable().optional(),
});

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = rewardSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Data hadiah tidak valid." }, { status: 400 });
  }

  const item = await prisma.rewardItem.create({ data: parsed.data });
  return NextResponse.json(item, { status: 201 });
}
