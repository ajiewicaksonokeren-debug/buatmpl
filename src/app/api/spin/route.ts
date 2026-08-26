import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { spinWheel, NoTicketError, NoPrizeAvailableError } from "@/lib/spin";

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Harus login." }, { status: 401 });
  }

  try {
    const result = await spinWheel(session.user.id);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    if (err instanceof NoTicketError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    if (err instanceof NoPrizeAvailableError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    console.error(err);
    return NextResponse.json({ error: "Terjadi kesalahan." }, { status: 500 });
  }
}
