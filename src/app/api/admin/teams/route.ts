import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/adminGuard";
import { prisma } from "@/lib/prisma";

const teamSchema = z.object({
  name: z.string().min(2).max(80),
  shortName: z.string().min(2).max(10),
  logoUrl: z.string().url().optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = teamSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Data tim tidak valid." }, { status: 400 });
  }

  const { name, shortName, logoUrl } = parsed.data;
  const team = await prisma.team.create({
    data: { name, shortName, logoUrl: logoUrl || undefined },
  });

  return NextResponse.json(team, { status: 201 });
}
