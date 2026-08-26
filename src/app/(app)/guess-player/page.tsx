import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PlayerGuessGame } from "@/components/PlayerGuessGame";
import { POINTS_PLAYER_GUESS } from "@/lib/playerQuiz";

export default async function GuessPlayerPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/guess-player");

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold text-white mb-1 text-center">Tebak Pemain</h1>
      <p className="text-neutral-400 text-sm mb-10 text-center">
        Tebak nama pemain dari fotonya. Jawaban benar = {POINTS_PLAYER_GUESS} poin. Setiap
        pemain hanya bisa dijawab sekali.
      </p>

      <PlayerGuessGame />
    </div>
  );
}
