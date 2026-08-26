import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";

const tabs = [
  { href: "/admin/matches", label: "Pertandingan" },
  { href: "/admin/players", label: "Pemain" },
  { href: "/admin/rewards", label: "Hadiah" },
  { href: "/admin/spin-prizes", label: "Hadiah Spin" },
  { href: "/admin/redemptions", label: "Penukaran" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-xl font-bold text-white mb-6">Panel Admin</h1>
      <nav className="flex gap-1 mb-8 border-b border-white/10 overflow-x-auto">
        {tabs.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="shrink-0 whitespace-nowrap px-3 py-2 text-sm text-neutral-300 hover:text-white"
          >
            {t.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
