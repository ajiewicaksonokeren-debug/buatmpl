"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const links = [
  { href: "/predict", label: "Prediksi" },
  { href: "/leaderboard", label: "Peringkat" },
  { href: "/spin", label: "Spin" },
  { href: "/redeem", label: "Tukar Poin" },
  { href: "/wallet", label: "Dompet" },
];

export function NavBar() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-white/10 bg-neutral-950/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="font-bold text-lg tracking-tight text-white">
          MPL<span className="text-amber-400">Tebak</span>
        </Link>

        {session?.user && (
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-md transition"
              >
                {l.label}
              </Link>
            ))}
            {session.user.role === "ADMIN" && (
              <Link
                href="/admin/matches"
                className="px-3 py-2 text-sm text-amber-400 hover:text-amber-300 hover:bg-white/5 rounded-md transition"
              >
                Admin
              </Link>
            )}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {status === "loading" ? null : session?.user ? (
            <>
              <span className="hidden sm:inline text-sm text-white">{session.user.name}</span>
              <Link
                href="/profile"
                className="text-sm text-neutral-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-white/5"
              >
                Profil
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-md transition"
              >
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-neutral-300 hover:text-white px-3 py-1.5"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="text-sm bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-3 py-1.5 rounded-md transition"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
