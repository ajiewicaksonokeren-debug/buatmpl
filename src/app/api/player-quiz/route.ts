import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import {
  getNextChallenge,
  submitGuess,
  NoChallengeAvailableError,
  InvalidChallengeError,
  AlreadyAnsweredError,
} from "@/lib/playerQuiz";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Harus login." }, { status: 401 });
  }

  try {
    const challenge = await getNextChallenge(session.user.id);
    return NextResponse.json(challenge, { status: 200 });
  } catch (err) {
    if (err instanceof NoChallengeAvailableError) {
      return NextResponse.json(
        { error: "Kamu sudah menjawab semua pemain yang tersedia. Cek lagi nanti!" },
        { status: 404 }
      );
    }
    console.error(err);
    return NextResponse.json({ error: "Terjadi kesalahan." }, { status: 500 });
  }
}

const guessSchema = z.object({
  attemptId: z.string().min(1),
  chosenPlayerId: z.string().min(1),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Harus login." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = guessSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }

  try {
    const result = await submitGuess(session.user.id, parsed.data.attemptId, parsed.data.chosenPlayerId);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    if (err instanceof InvalidChallengeError) {
      return NextResponse.json({ error: "Pertanyaan tidak ditemukan." }, { status: 404 });
    }
    if (err instanceof AlreadyAnsweredError) {
      return NextResponse.json({ error: "Pertanyaan ini sudah dijawab." }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ error: "Terjadi kesalahan." }, { status: 500 });
  }
}
