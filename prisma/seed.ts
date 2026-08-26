import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@mpltebak.local";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "admin12345";

  const adminPasswordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Admin",
      email: adminEmail,
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  const teamNames: [string, string][] = [
    ["Evos Legends", "EVOS"],
    ["RRQ Hoshi", "RRQ"],
    ["Onic Esports", "ONIC"],
    ["Alter Ego", "AE"],
    ["Bigetron Alpha", "BTR"],
    ["Dewa United Esports", "DEWA"],
  ];

  const teams = [];
  for (const [name, shortName] of teamNames) {
    const team = await prisma.team.upsert({
      where: { name },
      update: {},
      create: { name, shortName },
    });
    teams.push(team);
  }

  const existingMatches = await prisma.match.count();
  if (existingMatches === 0) {
    const now = Date.now();
    await prisma.match.create({
      data: {
        homeTeamId: teams[0].id,
        awayTeamId: teams[1].id,
        week: "Week 1",
        startTime: new Date(now + 1000 * 60 * 60 * 24),
        lockTime: new Date(now + 1000 * 60 * 60 * 24 - 1000 * 60 * 10),
      },
    });
    await prisma.match.create({
      data: {
        homeTeamId: teams[2].id,
        awayTeamId: teams[3].id,
        week: "Week 1",
        startTime: new Date(now + 1000 * 60 * 60 * 48),
        lockTime: new Date(now + 1000 * 60 * 60 * 48 - 1000 * 60 * 10),
      },
    });
    await prisma.match.create({
      data: {
        homeTeamId: teams[4].id,
        awayTeamId: teams[5].id,
        week: "Week 1",
        startTime: new Date(now + 1000 * 60 * 60 * 72),
        lockTime: new Date(now + 1000 * 60 * 60 * 72 - 1000 * 60 * 10),
      },
    });
  }

  const spinPrizeCount = await prisma.spinPrize.count();
  if (spinPrizeCount === 0) {
    await prisma.spinPrize.createMany({
      data: [
        { name: "10 Poin Bonus", pointsValue: 10, weight: 40 },
        { name: "25 Poin Bonus", pointsValue: 25, weight: 30 },
        { name: "Stiker Digital Eksklusif", pointsValue: 0, weight: 15 },
        { name: "50 Poin Bonus", pointsValue: 50, weight: 10 },
        { name: "Merchandise Jersey Mini", pointsValue: 0, weight: 4, stock: 20 },
        { name: "Diamond ML 50 (kupon)", pointsValue: 0, weight: 1, stock: 5 },
      ],
    });
  }

  const rewardCount = await prisma.rewardItem.count();
  if (rewardCount === 0) {
    await prisma.rewardItem.createMany({
      data: [
        {
          name: "Diamond Mobile Legends 50",
          category: "Diamond ML",
          description: "Kupon top-up 50 Diamond, diproses manual oleh admin dalam 1x24 jam.",
          pointsCost: 500,
          stock: 50,
        },
        {
          name: "Diamond Mobile Legends 150",
          category: "Diamond ML",
          description: "Kupon top-up 150 Diamond, diproses manual oleh admin dalam 1x24 jam.",
          pointsCost: 1300,
          stock: 30,
        },
        {
          name: "Voucher Pulsa Rp10.000",
          category: "Voucher",
          description: "Voucher pulsa/token dikirim manual oleh admin.",
          pointsCost: 400,
        },
        {
          name: "Jersey Tim Favorit",
          category: "Merchandise",
          description: "Jersey official replika tim MPL pilihan.",
          pointsCost: 5000,
          stock: 10,
        },
        {
          name: "Smartphone Entry-Level",
          category: "Gadget",
          description: "Hadiah undian poin tertinggi bulanan — stok sangat terbatas.",
          pointsCost: 50000,
          stock: 1,
        },
      ],
    });
  }

  console.log("Seed selesai.");
  console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
