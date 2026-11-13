/// <reference types="node" />
import { prisma } from "../src/config/prisma.js";
import { ExamSession } from "../src/generated/prisma/enums.js";

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

type TopicSeed = {
  name: string;
  subjectName: string;
  series: string[];
};

const topicsData: TopicSeed[] = [
  {
    name: "Probabilités",
    subjectName: "Mathématiques",
    series: ["S1", "S2", "L1", "L2"],
  },
  {
    name: "Fonctions numériques",
    subjectName: "Mathématiques",
    series: ["S1", "S2", "L1", "L2"],
  },
  {
    name: "Suites numériques",
    subjectName: "Mathématiques",
    series: ["S1", "S2", "L1", "L2"],
  },
  {
    name: "Nombres complexes",
    subjectName: "Mathématiques",
    series: ["S1", "S2"],
  },
  {
    name: "Équations différentielles",
    subjectName: "Mathématiques",
    series: ["S1", "S2"],
  },
  {
    name: "Statistiques descriptives",
    subjectName: "Mathématiques",
    series: ["L1", "L2"],
  },
  {
    name: "Cinématique et dynamique",
    subjectName: "Physique-Chimie",
    series: ["S1", "S2"],
  },
  {
    name: "Acides et bases",
    subjectName: "Physique-Chimie",
    series: ["S1", "S2"],
  },
  {
    name: "Génétique",
    subjectName: "Sciences de la Vie et de la Terre",
    series: ["S2"],
  },
  {
    name: "Écologie",
    subjectName: "Sciences de la Vie et de la Terre",
    series: ["S2"],
  },
  {
    name: "Immunologie",
    subjectName: "Sciences de la Vie et de la Terre",
    series: ["S2"],
  },
  {
    name: "La liberté",
    subjectName: "Philosophie",
    series: ["S1", "S2", "L1", "L2"],
  },
  {
    name: "La vérité",
    subjectName: "Philosophie",
    series: ["S1", "S2", "L1", "L2"],
  },
  {
    name: "Le travail",
    subjectName: "Philosophie",
    series: ["S1", "S2", "L1", "L2"],
  },
  {
    name: "Commentaire composé",
    subjectName: "Français",
    series: ["L1", "L2"],
  },
  {
    name: "Dissertation",
    subjectName: "Français",
    series: ["L1", "L2"],
  },
  {
    name: "Résumé de texte",
    subjectName: "Français",
    series: ["L1", "L2"],
  },
];

type ExerciseSeed = {
  exerciseNumber: number;
  topicName: string;
  statement: string | null;
  correction: string | null;
  statementFile?: string | null;
  correctionFile?: string | null;
};

type ExamSeed = {
  year: number;
  session: "NORMAL" | "REPLACEMENT";
  seriesName: string;
  subjectName: string;
  exercises: ExerciseSeed[];
};

const examsData: ExamSeed[] = [
  {
    year: 2024,
    session: ExamSession.NORMAL,
    seriesName: "S1",
    subjectName: "Mathématiques",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "Probabilités",
        statement:
          "Une urne contient 5 boules rouges, 3 boules blanches et 2 boules noires indiscernables au toucher. On tire simultanément 3 boules. Calcule la probabilité d'obtenir exactement deux boules rouges.",
        correction:
          "Le nombre total de tirages est C(10,3)=120. Les tirages favorables sont C(5,2)×C(5,1)=50. La probabilité cherchée est donc 50/120=5/12.",
      },
      {
        exerciseNumber: 2,
        topicName: "Fonctions numériques",
        statement:
          "Soit f la fonction définie sur R par f(x)=x^3-3x+2. Étudie les variations de f et détermine ses extremums.",
        correction:
          "f'(x)=3x^2-3=3(x-1)(x+1). f est croissante sur ]-∞,-1], décroissante sur [-1,1], puis croissante sur [1,+∞[. Le maximum local vaut f(-1)=4 et le minimum local f(1)=0.",
      },
      {
        exerciseNumber: 3,
        topicName: "Suites numériques",
        statement:
          "La suite (u_n) est définie par u_0=2 et u_{n+1}=0,5u_n+3. Montre que la suite (v_n) définie par v_n=u_n-6 est géométrique, puis exprime u_n en fonction de n.",
        correction:
          "v_{n+1}=u_{n+1}-6=0,5u_n-3=0,5(u_n-6)=0,5v_n. (v_n) est donc géométrique de raison 0,5 et de premier terme -4. On en déduit u_n=6-4(0,5)^n.",
      },
    ],
  },
  {
    year: 2024,
    session: ExamSession.NORMAL,
    seriesName: "S1",
    subjectName: "Physique-Chimie",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "Cinématique et dynamique",
        statement:
          "Un mobile décrit une trajectoire rectiligne. Sa vitesse est donnée par v(t)=3t^2+2t (en m/s). Détermine l'expression de son accélération et la distance parcourue entre t=0 et t=2 s.",
        correction:
          "a(t)=dv/dt=6t+2. La distance parcourue est l'intégrale de v entre 0 et 2 : [t^3+t^2]_0^2=8+4=12 m.",
      },
      {
        exerciseNumber: 2,
        topicName: "Acides et bases",
        statement:
          "On dissout 0,01 mol d'acide éthanoïque dans 1 L d'eau. Le pH de la solution est 3,4. Calcule le taux d'avancement final de la réaction de l'acide avec l'eau.",
        correction: null,
        correctionFile: "/files/corrections/2024-s1-pc-ex2.pdf",
      },
      {
        exerciseNumber: 3,
        topicName: "Cinématique et dynamique",
        statement:
          "Un solide de masse m=2 kg glisse sur un plan incliné à 30° sans frottement. Calcule son accélération le long du plan. On prend g=10 m/s².",
        correction:
          "La composante motrice du poids vaut mg sin(30°)=2×10×0,5=10 N. L'accélération est donc a=F/m=5 m/s².",
      },
    ],
  },
  {
    year: 2024,
    session: ExamSession.NORMAL,
    seriesName: "S1",
    subjectName: "Philosophie",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "La liberté",
        statement: "La liberté consiste-t-elle à faire tout ce que l'on veut ?",
        correction:
          "Dissertation attendue : distinguer la liberté comme absence de contrainte et la liberté comme autonomie raisonnable. Références possibles : Rousseau, Kant, Sartre.",
      },
      {
        exerciseNumber: 2,
        topicName: "La vérité",
        statement:
          "Peut-on renoncer à la vérité au nom de la paix sociale ?",
        correction:
          "Analyse du conflit entre vérité et utilité sociale ; discuter le mensonge politique, la notion de vérité factuelle et la responsabilité.",
      },
      {
        exerciseNumber: 3,
        topicName: "Le travail",
        statement: "Le travail est-il seulement une contrainte ?",
        correction:
          "Montrer que le travail peut être aliénant, mais aussi source d'accomplissement, de reconnaissance et d'émancipation.",
      },
    ],
  },
  {
    year: 2024,
    session: ExamSession.NORMAL,
    seriesName: "S2",
    subjectName: "Mathématiques",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "Probabilités",
        statement:
          "Une maladie touche 2 % d'une population. Un test a une sensibilité de 95 % et une spécificité de 90 %. Calcule la probabilité qu'une personne testée positive soit réellement malade.",
        correction:
          "P(M|T+)=0,95×0,02/(0,95×0,02+0,10×0,98)≈0,162, soit environ 16,2 %.",
      },
      {
        exerciseNumber: 2,
        topicName: "Nombres complexes",
        statement:
          "Résous dans C l'équation z^2-4z+13=0, puis place les solutions dans le plan complexe.",
        correction:
          "Δ=16-52=-36=(6i)^2. Les solutions sont z=2+3i et z=2-3i ; elles sont symétriques par rapport à l'axe réel.",
      },
      {
        exerciseNumber: 3,
        topicName: "Équations différentielles",
        statement: null,
        statementFile: "/files/exercises/2024-s2-math-ex3.pdf",
        correction:
          "La solution générale est y(x)=A cos(2x)+B sin(2x). y(0)=1 donne A=1 ; y'(0)=2B=2 donne B=1. Donc y(x)=cos(2x)+sin(2x).",
      },
    ],
  },
  {
    year: 2024,
    session: ExamSession.NORMAL,
    seriesName: "S2",
    subjectName: "Physique-Chimie",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "Cinématique et dynamique",
        statement:
          "Un projectile est lancé avec une vitesse initiale de 20 m/s sous un angle de 45° par rapport à l'horizontale. Calcule sa portée sur un sol horizontal. On prend g=10 m/s².",
        correction:
          "La portée est R=v0² sin(2θ)/g=400×1/10=40 m.",
      },
      {
        exerciseNumber: 2,
        topicName: "Acides et bases",
        statement:
          "On mélange 20 mL d'acide chlorhydrique à 0,1 mol/L avec 30 mL de soude à 0,1 mol/L. Calcule le pH du mélange.",
        correction:
          "n(HCl)=2×10^-3 mol et n(NaOH)=3×10^-3 mol. Il reste 1×10^-3 mol de OH- dans 50 mL, soit [OH-]=0,02 mol/L. pOH=-log(0,02)=1,7, donc pH=12,3.",
      },
      {
        exerciseNumber: 3,
        topicName: "Cinématique et dynamique",
        statement:
          "Un satellite décrit une orbite circulaire de rayon r autour de la Terre. Exprime sa vitesse en fonction de r, G et M_T, puis calcule-la pour r=7,0×10^6 m.",
        correction:
          "L'égalité entre force gravitationnelle et force centripète donne v=√(GM_T/r). Avec G=6,67×10^-11 et M_T=6,0×10^24, on trouve v≈7,6×10^3 m/s.",
      },
    ],
  },
  {
    year: 2024,
    session: ExamSession.NORMAL,
    seriesName: "S2",
    subjectName: "Sciences de la Vie et de la Terre",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "Génétique",
        statement:
          "Un couple sans antécédent familial a un enfant atteint d'une maladie génétique rare. Explique comment une telle situation est possible en distinguant dominance et récessivité.",
        correction:
          "La maladie peut être récessive : les deux parents sont hétérozygotes porteurs sains. Le risque de transmission est alors de 25 % à chaque grossesse.",
      },
      {
        exerciseNumber: 2,
        topicName: "Écologie",
        statement:
          "Explique les conséquences de l'introduction d'une espèce exotique envahissante dans un écosystème stable.",
        correction:
          "L'espèce introduite peut entrer en compétition avec les espèces locales, modifier les chaînes alimentaires et réduire la biodiversité.",
      },
      {
        exerciseNumber: 3,
        topicName: "Immunologie",
        statement:
          "Décris le rôle des lymphocytes T dans la réponse immunitaire adaptative.",
        correction:
          "Les lymphocytes T auxiliaires activent les lymphocytes B et les lymphocytes T cytotoxiques ; ces derniers détruisent les cellules infectées.",
      },
    ],
  },
  {
    year: 2024,
    session: ExamSession.NORMAL,
    seriesName: "S2",
    subjectName: "Philosophie",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "La liberté",
        statement: "Sommes-nous responsables de nos choix ?",
        correction:
          "Problématiser la responsabilité face au déterminisme ; distinguer liberté d'indifférence et autonomie.",
      },
      {
        exerciseNumber: 2,
        topicName: "La vérité",
        statement: "La science dit-elle toujours la vérité ?",
        correction:
          "Discuter la vérité scientifique comme résultat provisoire, la méthode et la correction des erreurs.",
      },
      {
        exerciseNumber: 3,
        topicName: "Le travail",
        statement: "Que perd-on et que gagne-t-on en travaillant ?",
        correction:
          "Analyser l'aliénation et la division du travail, mais aussi l'émancipation et la reconnaissance.",
      },
    ],
  },
  {
    year: 2024,
    session: ExamSession.NORMAL,
    seriesName: "L1",
    subjectName: "Philosophie",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "La liberté",
        statement: "Peut-on être libre sans être indépendant ?",
        correction:
          "Montrer que l'indépendance n'est pas une condition suffisante de la liberté ; la liberté suppose aussi une capacité de choix éclairé.",
      },
      {
        exerciseNumber: 2,
        topicName: "La vérité",
        statement: "Le doute est-il l'ennemi ou le chemin de la vérité ?",
        correction:
          "Le doute méthodique peut être un instrument de recherche de la vérité, tandis que le doute radical peut menacer toute certitude.",
      },
      {
        exerciseNumber: 3,
        topicName: "Le travail",
        statement: "Le travail nous rend-il plus humains ?",
        correction:
          "Discuter la transformation de la nature, la socialisation et les risques d'aliénation.",
      },
    ],
  },
  {
    year: 2024,
    session: ExamSession.NORMAL,
    seriesName: "L1",
    subjectName: "Français",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "Commentaire composé",
        statement:
          "Vous ferez le commentaire composé du texte de Léopold Sédar Senghor, « Femme noire ». Analysez notamment le lyrisme et la célébration de la beauté.",
        correction:
          "Plan attendu : une célébration lyrique ; la femme comme symbole de l'Afrique ; une esthétique de la sensualité et de la mémoire.",
      },
      {
        exerciseNumber: 2,
        topicName: "Dissertation",
        statement:
          "Dans quelle mesure la littérature peut-elle éveiller les consciences ?",
        correction:
          "Introduction, thèse sur la fonction critique de la littérature, antithèse sur l'art pour l'art, synthèse sur la responsabilité de l'écrivain.",
      },
      {
        exerciseNumber: 3,
        topicName: "Résumé de texte",
        statement:
          "Résumez le texte de Cheikh Hamidou Kane, L'Aventure ambiguë, en 150 mots.",
        correction:
          "Le résumé doit restituer le conflit entre tradition et modernité, le parcours de Samba Diallo et la quête spirituelle.",
      },
    ],
  },
  {
    year: 2024,
    session: ExamSession.NORMAL,
    seriesName: "L2",
    subjectName: "Philosophie",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "La liberté",
        statement: "La liberté est-elle une illusion ?",
        correction:
          "Examiner les arguments déterministes et la possibilité d'une liberté pratique fondée sur la réflexion et la responsabilité.",
      },
      {
        exerciseNumber: 2,
        topicName: "La vérité",
        statement: "Peut-on prouver une croyance ?",
        correction:
          "Distinguer croyance, opinion et savoir ; discuter les limites de la preuve selon les domaines.",
      },
      {
        exerciseNumber: 3,
        topicName: "Le travail",
        statement: "Le travail est-il le propre de l'homme ?",
        correction: null,
        correctionFile: null,
      },
    ],
  },
  {
    year: 2024,
    session: ExamSession.NORMAL,
    seriesName: "L2",
    subjectName: "Français",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "Commentaire composé",
        statement:
          "Commentaire du poème « Le Lac » de Lamartine : étudiez le rapport entre le temps et le souvenir.",
        correction:
          "Plan possible : l'expression de la fuite du temps ; le rôle de la nature ; la dimension consolatrice du souvenir.",
      },
      {
        exerciseNumber: 2,
        topicName: "Dissertation",
        statement: "Le roman a-t-il pour fonction de représenter le réel ?",
        correction:
          "Discuter le réalisme, l'illusion référentielle et les pouvoirs de la fiction.",
      },
      {
        exerciseNumber: 3,
        topicName: "Résumé de texte",
        statement:
          "Résumez un texte argumentatif sur la place des langues nationales à l'école.",
        correction:
          "Le résumé doit dégager la thèse, les arguments et les exemples sans les commenter.",
        correctionFile: "/files/corrections/2024-l2-fr-ex3.pdf",
      },
    ],
  },
  {
    year: 2023,
    session: ExamSession.NORMAL,
    seriesName: "S1",
    subjectName: "Mathématiques",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "Fonctions numériques",
        statement:
          "Soit f la fonction définie sur R par f(x)=ln(x^2+1). Étudie les variations de f sur R.",
        correction:
          "f'(x)=2x/(x^2+1). f est décroissante sur ]-∞,0] et croissante sur [0,+∞[ ; son minimum vaut f(0)=0.",
      },
      {
        exerciseNumber: 2,
        topicName: "Suites numériques",
        statement:
          "Calcule la somme S_n=1+1/2+1/4+...+1/2^n, puis détermine sa limite quand n tend vers +∞.",
        correction:
          "S_n=(1-(1/2)^{n+1})/(1-1/2)=2(1-(1/2)^{n+1}). La limite est 2.",
      },
      {
        exerciseNumber: 3,
        topicName: "Probabilités",
        statement:
          "On lance deux dés équilibrés. Calcule la probabilité d'obtenir une somme supérieure ou égale à 10.",
        correction:
          "Les couples favorables sont (4,6), (5,5), (5,6), (6,4), (6,5) et (6,6), soit 6 cas sur 36. La probabilité est 1/6.",
      },
    ],
  },
  {
    year: 2023,
    session: ExamSession.NORMAL,
    seriesName: "S2",
    subjectName: "Mathématiques",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "Probabilités",
        statement:
          "Une entreprise produit des pièces dont 3 % sont défectueuses. On prélève 10 pièces avec remise. Calcule la probabilité d'en trouver au plus une défectueuse.",
        correction:
          "X suit une loi binomiale B(10;0,03). P(X≤1)=0,97^10+10×0,03×0,97^9≈0,965.",
      },
      {
        exerciseNumber: 2,
        topicName: "Nombres complexes",
        statement:
          "Écris sous forme algébrique le nombre complexe (1+i√3)^3.",
        correction:
          "1+i√3=2e^{iπ/3}. Donc (1+i√3)^3=8e^{iπ}=-8.",
      },
      {
        exerciseNumber: 3,
        topicName: "Suites numériques",
        statement:
          "Étudie la convergence de la suite u_n=(3n+1)/(n+2).",
        correction:
          "u_n=(3+1/n)/(1+2/n) tend vers 3. La suite converge vers 3.",
      },
    ],
  },
  {
    year: 2023,
    session: ExamSession.NORMAL,
    seriesName: "L1",
    subjectName: "Mathématiques",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "Statistiques descriptives",
        statement:
          "Les notes d'une classe sont : 8, 12, 15, 9, 14, 10, 11, 13. Calcule la moyenne, la médiane et l'écart-type.",
        correction: "Moyenne=11,5 ; médiane=(11+12)/2=11,5 ; écart-type≈2,3.",
      },
      {
        exerciseNumber: 2,
        topicName: "Probabilités",
        statement:
          "On tire une carte au hasard dans un jeu de 32 cartes. Calcule la probabilité d'obtenir un roi ou un cœur.",
        correction: "P(R∪C)=4/32+8/32-1/32=11/32.",
      },
      {
        exerciseNumber: 3,
        topicName: "Fonctions numériques",
        statement: "Étudie le signe de f(x)=x^2-5x+6 sur R.",
        correction:
          "f(x)=(x-2)(x-3). f est positive sur ]-∞,2]∪[3,+∞[ et négative sur [2,3].",
      },
    ],
  },
  {
    year: 2023,
    session: ExamSession.NORMAL,
    seriesName: "L2",
    subjectName: "Mathématiques",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "Statistiques descriptives",
        statement:
          "Dans une série de 20 valeurs, la moyenne est 12 et la somme des carrés des écarts à la moyenne est 80. Calcule la variance et l'écart-type.",
        correction: "Variance=80/20=4 ; écart-type=2.",
      },
      {
        exerciseNumber: 2,
        topicName: "Suites numériques",
        statement:
          "Soit u_n=2n^2-3n+1. Calcule u_5 et étudie le sens de variation de la suite.",
        correction:
          "u_5=50-15+1=36. u_{n+1}-u_n=4n-1>0 pour n≥1, donc la suite est croissante.",
      },
      {
        exerciseNumber: 3,
        topicName: "Fonctions numériques",
        statement:
          "Détermine les asymptotes de la fonction f(x)=(2x+1)/(x-3).",
        correction:
          "Asymptote verticale x=3 ; asymptote horizontale y=2 en ±∞.",
      },
    ],
  },
  {
    year: 2024,
    session: ExamSession.REPLACEMENT,
    seriesName: "S2",
    subjectName: "Mathématiques",
    exercises: [
      {
        exerciseNumber: 1,
        topicName: "Équations différentielles",
        statement:
          "Résous l'équation différentielle y'-2y=0 avec y(0)=3.",
        correction: "La solution est y(x)=3e^{2x}.",
      },
      {
        exerciseNumber: 2,
        topicName: "Probabilités",
        statement:
          "On dispose de 3 boules blanches et 2 boules noires. On tire successivement sans remise deux boules. Calcule la probabilité d'obtenir deux boules de même couleur.",
        correction:
          "P(BB)+P(NN)=(3/5×2/4)+(2/5×1/4)=6/20+2/20=8/20=2/5.",
      },
      {
        exerciseNumber: 3,
        topicName: "Fonctions numériques",
        statement:
          "Soit f(x)=x^3-3x^2+2. Calcule f'(x) et détermine les points où la tangente est horizontale.",
        correction:
          "f'(x)=3x^2-6x=3x(x-2). Les tangentes horizontales sont en x=0 et x=2.",
      },
    ],
  },
];

async function main() {
  console.log("Début de l'amorçage...");

  const seriesIds = new Map<string, number>();

  for (const item of seriesData) {
    const series = await prisma.series.upsert({
      where: { name: item.name },
      update: {},
      create: { name: item.name },
    });
    seriesIds.set(item.name, series.id);
    console.log(`Série : ${series.name}`);
  }

  const seriesConnections = (names: string[]) =>
    names.map((name) => {
      const id = seriesIds.get(name);
      if (!id) {
        throw new Error(`Série introuvable : ${name}`);
      }
      return { id };
    });

  const subjectIds = new Map<string, number>();

  for (const item of subjectsData) {
    const subject = await prisma.subject.upsert({
      where: { name: item.name },
      update: {
        series: { set: seriesConnections(item.series) },
      },
      create: {
        name: item.name,
        series: { connect: seriesConnections(item.series) },
      },
    });
    subjectIds.set(item.name, subject.id);
    console.log(
      `Matière : ${subject.name} (reliée à ${item.series.join(", ")})`
    );
  }

  const topicIds = new Map<string, number>();

  for (const item of topicsData) {
    const subjectId = subjectIds.get(item.subjectName);
    if (!subjectId) {
      throw new Error(`Matière introuvable : ${item.subjectName}`);
    }

    const topic = await prisma.topic.upsert({
      where: {
        name_subjectId: {
          name: item.name,
          subjectId,
        },
      },
      update: {
        series: { set: seriesConnections(item.series) },
      },
      create: {
        name: item.name,
        subjectId,
        series: { connect: seriesConnections(item.series) },
      },
    });
    topicIds.set(`${item.subjectName}:${item.name}`, topic.id);
    console.log(
      `Notion : ${topic.name} (${item.subjectName} - ${item.series.join(", ")})`
    );
  }

  for (const item of examsData) {
    const seriesId = seriesIds.get(item.seriesName);
    if (!seriesId) {
      throw new Error(`Série introuvable : ${item.seriesName}`);
    }

    const subjectId = subjectIds.get(item.subjectName);
    if (!subjectId) {
      throw new Error(`Matière introuvable : ${item.subjectName}`);
    }

    const subjectContext = await prisma.subject.findFirst({
      where: {
        id: subjectId,
        series: { some: { id: seriesId } },
      },
      select: { id: true },
    });
    if (!subjectContext) {
      throw new Error(
        `La matière ${item.subjectName} n'est pas liée à la série ${item.seriesName}`
      );
    }

    const exam = await prisma.exam.upsert({
      where: {
        year_session_seriesId_subjectId: {
          year: item.year,
          session: item.session,
          seriesId,
          subjectId,
        },
      },
      update: {},
      create: {
        year: item.year,
        session: item.session,
        seriesId,
        subjectId,
      },
    });

    for (const exercise of item.exercises) {
      const topicId = topicIds.get(
        `${item.subjectName}:${exercise.topicName}`
      );
      if (!topicId) {
        throw new Error(
          `Notion introuvable : ${exercise.topicName} (${item.subjectName})`
        );
      }

      const topicContext = await prisma.topic.findFirst({
        where: {
          id: topicId,
          series: { some: { id: seriesId } },
        },
        select: { id: true },
      });
      if (!topicContext) {
        throw new Error(
          `La notion ${exercise.topicName} n'est pas liée à la série ${item.seriesName}`
        );
      }

      await prisma.exercise.upsert({
        where: {
          examId_exerciseNumber: {
            examId: exam.id,
            exerciseNumber: exercise.exerciseNumber,
          },
        },
        update: {
          topicId,
          statement: exercise.statement,
          statementFile: exercise.statementFile ?? null,
          correction: exercise.correction,
          correctionFile: exercise.correctionFile ?? null,
        },
        create: {
          examId: exam.id,
          exerciseNumber: exercise.exerciseNumber,
          topicId,
          statement: exercise.statement,
          statementFile: exercise.statementFile ?? null,
          correction: exercise.correction,
          correctionFile: exercise.correctionFile ?? null,
        },
      });
    }

    console.log(
      `Examen : ${item.seriesName} ${item.subjectName} ${item.year} ${item.session} (${item.exercises.length} exercices)`
    );
  }

  console.log("Amorçage terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("Erreur pendant le seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
