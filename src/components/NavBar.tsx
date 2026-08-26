"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const links = [
  { href: "/predict", label: "Prediksi" },
  { href: "/guess-player", label: "Tebak Pemain" },
  { href: "/leaderboard", label: "Peringkat" },
  { href: "/spin", label: "Spin" },
  { href: "/redeem", label: "Tukar Poin" },
  { href: "/wallet", label: "Dompet" },
];

export function NavBar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-white/10 bg-neutral-950/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="font-bold text-lg tracking-tight text-white shrink-0">
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

        <div className="flex items-center gap-2 sm:gap-3">
          {status === "loading" ? null : session?.user ? (
            <>
              <span className="hidden sm:inline text-sm text-white">{session.user.name}</span>
              <Link
                href="/profile"
                className="hidden sm:inline text-sm text-neutral-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-white/5"
              >
                Profil
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hidden sm:inline text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-md transition"
              >
                Keluar
              </button>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Buka menu"
                aria-expanded={menuOpen}
                className="md:hidden text-white p-2 -mr-2 rounded-md hover:bg-white/5"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {menuOpen ? (
                    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                  ) : (
                    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                  )}
                </svg>
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

      {session?.user && menuOpen && (
        <nav className="md:hidden border-t border-white/10 px-4 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 text-sm rounded-md transition ${
                pathname === l.href
                  ? "bg-white/10 text-white"
                  : "text-neutral-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {session.user.role === "ADMIN" && (
            <Link
              href="/admin/matches"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-sm text-amber-400 hover:text-amber-300 hover:bg-white/5 rounded-md transition"
            >
              Admin
            </Link>
          )}
          <Link
            href="/profile"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 rounded-md transition"
          >
            Profil
          </Link>
          <button
            onClick={() => {
              setMenuOpen(false);
              signOut({ callbackUrl: "/" });
            }}
            className="mt-1 text-left px-3 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-md transition"
          >
            Keluar
          </button>
        </nav>
      )}
    </header>
  );
}
