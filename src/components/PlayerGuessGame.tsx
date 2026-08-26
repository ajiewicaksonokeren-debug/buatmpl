"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Choice = { id: string; name: string };
type Challenge = { attemptId: string; photoUrl: string; choices: Choice[] };
type Feedback = { correct: boolean; pointsAwarded: number; correctPlayerName: string };

export function PlayerGuessGame() {
  const router = useRouter();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const loadChallenge = useCallback(async () => {
    setLoading(true);
    setError(null);
    setFeedback(null);
    setSelected(null);

    const res = await fetch("/api/player-quiz");
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setChallenge(null);
      setError(data.error ?? "Gagal memuat pertanyaan.");
      return;
    }
    setChallenge(data);
  }, []);

  useEffect(() => {
    // Standard fetch-on-mount: loadChallenge sets loading/error state before
    // its first await, which is intentional (shows a spinner immediately).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadChallenge();
  }, [loadChallenge]);

  async function handleChoose(choiceId: string) {
    if (!challenge || submitting || feedback) return;
    setSelected(choiceId);
    setSubmitting(true);

    const res = await fetch("/api/player-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attemptId: challenge.attemptId, chosenPlayerId: choiceId }),
    });
    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error ?? "Gagal mengirim jawaban.");
      return;
    }
    setFeedback(data);
    if (data.correct) setScore((s) => s + data.pointsAwarded);
    router.refresh();
  }

  if (loading) {
    return <p className="text-center text-neutral-500 text-sm py-16">Memuat pertanyaan...</p>;
  }

  if (error && !challenge) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-400 text-sm">{error}</p>
      </div>
    );
  }

  if (!challenge) return null;

  return (
    <div>
      <p className="text-center text-xs text-neutral-500 mb-4">
        Skor sesi ini: <span className="text-amber-400 font-semibold">{score}</span>
      </p>

      <div className="mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element -- external, unpredictable admin-supplied URLs */}
        <img
          src={challenge.photoUrl}
          alt="Tebak pemain ini"
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-center text-white font-medium mb-4">Siapa pemain ini?</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
        {challenge.choices.map((choice) => {
          const isSelected = selected === choice.id;
          const showCorrect = feedback && choice.id === selected && feedback.correct;
          const showWrong = feedback && isSelected && !feedback.correct;
          return (
            <button
              key={choice.id}
              onClick={() => handleChoose(choice.id)}
              disabled={submitting || !!feedback}
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition disabled:cursor-not-allowed ${
                showCorrect
                  ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                  : showWrong
                  ? "border-red-500 bg-red-500/10 text-red-400"
                  : "border-white/10 bg-neutral-900/50 text-white hover:border-amber-400/50"
              }`}
            >
              {choice.name}
            </button>
          );
        })}
      </div>

      {feedback && (
        <div className="text-center mt-6">
          {feedback.correct ? (
            <p className="text-emerald-400 font-semibold">
              Benar! +{feedback.pointsAwarded} poin 🎉
            </p>
          ) : (
            <p className="text-red-400 font-semibold">
              Salah. Jawaban yang benar: {feedback.correctPlayerName}
            </p>
          )}
          <button
            onClick={loadChallenge}
            className="mt-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-5 py-2 rounded-md transition text-sm"
          >
            Pertanyaan Berikutnya
          </button>
        </div>
      )}

      {error && feedback === null && (
        <p className="text-center text-xs text-red-400 mt-4">{error}</p>
      )}
    </div>
  );
}
