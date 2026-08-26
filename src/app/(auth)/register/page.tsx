"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Gagal mendaftar.");
      setLoading(false);
      return;
    }

    const signInRes = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (signInRes?.error) {
      router.push("/login");
      return;
    }
    router.push("/predict");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold mb-1">Daftar</h1>
      <p className="text-neutral-400 text-sm mb-8">
        Gratis. Tidak ada deposit atau taruhan uang.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-neutral-300 mb-1">Nama</label>
          <input
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 text-sm outline-none focus:border-amber-400"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-300 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 text-sm outline-none focus:border-amber-400"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-300 mb-1">Password (min. 8 karakter)</label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md bg-neutral-900 border border-white/10 px-3 py-2 text-sm outline-none focus:border-amber-400"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-neutral-950 font-semibold py-2 rounded-md transition"
        >
          {loading ? "Memproses..." : "Daftar"}
        </button>
      </form>

      <p className="text-sm text-neutral-400 mt-6">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-amber-400 hover:underline">
          Masuk
        </Link>
      </p>
    </div>
  );
}
