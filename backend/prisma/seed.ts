/// <reference types="node" />
import { prisma } from "../src/config/prisma.js";

const seriesData = [
  { name: "S1" },
  { name: "S2" },
  { name: "L1" },
  { name: "L2" },
];

const subjectsData = [
  {
    name: "Mathématiques",
    series: ["S1", "S2", "L1", "L2"],
  },
  {
    name: "Physique-Chimie",
    series: ["S1", "S2"],
  },
  {
    name: "Sciences de la Vie et de la Terre",
    series: ["S2"],
  },
  {
    name: "Philosophie",
    series: ["S1", "S2", "L1", "L2"],
  },
  {
    name: "Français",
    series: ["L1", "L2"],
  },
];

async function main() {
  console.log("🌱 Début de l'amorçage...");

  // 1. Amorcer les séries
  for (const item of seriesData) {
    const s = await prisma.series.upsert({
      where: { name: item.name },
      update: {},
      create: { name: item.name },
    });
    console.log(`✅ Série : ${s.name}`);
  }

  // 2. Amorcer les matières et les relier aux séries
  for (const item of subjectsData) {
    const subject = await prisma.subject.upsert({
      where: { name: item.name },
      update: {
        series: {
          connect: item.series.map((name) => ({ name })),
        },
      },
      create: {
        name: item.name,
        series: {
          connect: item.series.map((name) => ({ name })),
        },
      },
    });
    console.log(`📚 Matière : ${subject.name} (reliée à ${item.series.join(", ")})`);
  }

  console.log("✨ Amorçage terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant le seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
