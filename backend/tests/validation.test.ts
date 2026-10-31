import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import { after, before, describe, test } from "node:test";
import app from "../src/app.js";
import { prisma } from "../src/config/prisma.js";

type ErrorBody = {
  error: {
    code: string;
    message: string;
  };
};

type ExercisesBody = {
  data: unknown[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
};

type Subject = {
  id: number;
  name: string;
};

type Topic = {
  id: number;
  name: string;
};

let server: Server | undefined;
let baseUrl = "";

const created = {
  seriesIds: [] as number[],
  subjectIds: [] as number[],
  topicIds: [] as number[],
  examIds: [] as number[],
};

let seriesId = 0;
let otherSeriesId = 0;
let subjectId = 0;
let otherSubjectId = 0;
let topicId = 0;
let emptyTopicId = 0;

const get = async <T>(path: string) => {
  const response = await fetch(`${baseUrl}${path}`);
  const body = (await response.json()) as T;
  return { response, body };
};

before(async () => {
  const suffix = randomUUID();

  const series = await prisma.series.create({
    data: { name: `TEST-${suffix}-S1` },
  });
  const otherSeries = await prisma.series.create({
    data: { name: `TEST-${suffix}-S2` },
  });
  created.seriesIds.push(series.id, otherSeries.id);

  const subject = await prisma.subject.create({
    data: {
      name: `TEST-${suffix}-SUBJECT-1`,
      series: { connect: { id: series.id } },
    },
  });
  const otherSubject = await prisma.subject.create({
    data: {
      name: `TEST-${suffix}-SUBJECT-2`,
      series: { connect: { id: series.id } },
    },
  });
  created.subjectIds.push(subject.id, otherSubject.id);

  const topic = await prisma.topic.create({
    data: {
      name: `TEST-${suffix}-TOPIC-1`,
      subjectId: subject.id,
      series: { connect: { id: series.id } },
    },
  });
  const emptyTopic = await prisma.topic.create({
    data: {
      name: `TEST-${suffix}-TOPIC-EMPTY`,
      subjectId: subject.id,
      series: { connect: { id: series.id } },
    },
  });
  created.topicIds.push(topic.id, emptyTopic.id);

  const exam = await prisma.exam.create({
    data: {
      year: 2099,
      session: "NORMAL",
      seriesId: series.id,
      subjectId: subject.id,
    },
  });
  created.examIds.push(exam.id);

  await prisma.exercise.createMany({
    data: [1, 2, 3].map((exerciseNumber) => ({
      exerciseNumber,
      examId: exam.id,
      topicId: topic.id,
      statement: `Exercice de test ${exerciseNumber}`,
    })),
  });

  seriesId = series.id;
  otherSeriesId = otherSeries.id;
  subjectId = subject.id;
  otherSubjectId = otherSubject.id;
  topicId = topic.id;
  emptyTopicId = emptyTopic.id;

  server = app.listen(0);
  await new Promise<void>((resolve) => server!.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

after(async () => {
  if (server) {
    await new Promise<void>((resolve, reject) => {
      server!.close((error) => (error ? reject(error) : resolve()));
    });
  }

  if (created.examIds.length > 0) {
    await prisma.exercise.deleteMany({
      where: { examId: { in: created.examIds } },
    });
    await prisma.exam.deleteMany({ where: { id: { in: created.examIds } } });
  }

  if (created.topicIds.length > 0) {
    await prisma.topic.deleteMany({ where: { id: { in: created.topicIds } } });
  }

  if (created.subjectIds.length > 0) {
    await prisma.subject.deleteMany({
      where: { id: { in: created.subjectIds } },
    });
  }

  if (created.seriesIds.length > 0) {
    await prisma.series.deleteMany({ where: { id: { in: created.seriesIds } } });
  }

  await prisma.$disconnect();
});

describe("validation des paramètres", () => {
  test("GET /api/subjects refuse une série inexistante", async () => {
    const { response, body } = await get<ErrorBody>(
      "/api/subjects?seriesId=999999999"
    );

    assert.equal(response.status, 404);
    assert.equal(body.error.code, "NOT_FOUND");
  });

  test("GET /api/subjects valide le format de seriesId", async () => {
    const queries = [
      "seriesId=abc",
      "seriesId=",
      "seriesId=0",
      `seriesId=${seriesId}&seriesId=${seriesId}`,
    ];

    for (const query of queries) {
      const { response, body } = await get<ErrorBody>(
        `/api/subjects?${query}`
      );
      assert.equal(response.status, 400);
      assert.equal(body.error.code, "INVALID_QUERY");
    }
  });

  test("GET /api/subjects retourne les matières d'une série valide", async () => {
    const { response, body } = await get<Subject[]>(
      `/api/subjects?seriesId=${seriesId}`
    );

    assert.equal(response.status, 200);
    assert.ok(body.some((subject) => subject.id === subjectId));
    assert.ok(body.some((subject) => subject.id === otherSubjectId));
  });

  test("GET /api/topics exige subjectId et seriesId", async () => {
    const { response, body } = await get<ErrorBody>(
      `/api/topics?seriesId=${seriesId}`
    );

    assert.equal(response.status, 400);
    assert.equal(body.error.code, "INVALID_QUERY");
  });

  test("GET /api/topics valide le contexte matière/série", async () => {
    const unknown = await get<ErrorBody>(
      `/api/topics?subjectId=999999999&seriesId=${seriesId}`
    );
    assert.equal(unknown.response.status, 404);

    const notLinked = await get<ErrorBody>(
      `/api/topics?subjectId=${otherSubjectId}&seriesId=${otherSeriesId}`
    );
    assert.equal(notLinked.response.status, 404);
  });

  test("GET /api/topics retourne les notions du contexte", async () => {
    const { response, body } = await get<Topic[]>(
      `/api/topics?subjectId=${subjectId}&seriesId=${seriesId}`
    );

    assert.equal(response.status, 200);
    assert.ok(body.some((topic) => topic.id === topicId));
    assert.ok(body.some((topic) => topic.id === emptyTopicId));
  });

  test("GET /api/topics accepte un contexte valide sans notions", async () => {
    const { response, body } = await get<Topic[]>(
      `/api/topics?subjectId=${otherSubjectId}&seriesId=${seriesId}`
    );

    assert.equal(response.status, 200);
    assert.deepEqual(body, []);
  });

  test("GET /api/exercises exige les filtres obligatoires", async () => {
    const { response, body } = await get<ErrorBody>(
      `/api/exercises?subjectId=${subjectId}&seriesId=${seriesId}`
    );

    assert.equal(response.status, 400);
    assert.equal(body.error.code, "INVALID_QUERY");
  });

  test("GET /api/exercises refuse un contexte incohérent", async () => {
    const wrongSubject = await get<ErrorBody>(
      `/api/exercises?topicId=${topicId}&subjectId=${otherSubjectId}&seriesId=${seriesId}`
    );
    assert.equal(wrongSubject.response.status, 404);

    const wrongSeries = await get<ErrorBody>(
      `/api/exercises?topicId=${topicId}&subjectId=${subjectId}&seriesId=${otherSeriesId}`
    );
    assert.equal(wrongSeries.response.status, 404);

    const unknownTopic = await get<ErrorBody>(
      `/api/exercises?topicId=999999999&subjectId=${subjectId}&seriesId=${seriesId}`
    );
    assert.equal(unknownTopic.response.status, 404);
  });

  test("GET /api/exercises retourne une page et ses métadonnées", async () => {
    const page1 = await get<ExercisesBody>(
      `/api/exercises?topicId=${topicId}&subjectId=${subjectId}&seriesId=${seriesId}&page=1&limit=2`
    );

    assert.equal(page1.response.status, 200);
    assert.equal(page1.response.headers.get("cache-control"), "no-store");
    assert.deepEqual(page1.body.pagination, {
      page: 1,
      limit: 2,
      total: 3,
      totalPages: 2,
      hasNext: true,
      hasPrevious: false,
    });
    assert.equal(page1.body.data.length, 2);

    const page2 = await get<ExercisesBody>(
      `/api/exercises?topicId=${topicId}&subjectId=${subjectId}&seriesId=${seriesId}&page=2&limit=2`
    );

    assert.equal(page2.response.status, 200);
    assert.equal(page2.body.data.length, 1);
    assert.equal(page2.body.pagination.hasNext, false);
    assert.equal(page2.body.pagination.hasPrevious, true);
  });

  test("GET /api/exercises accepte un contexte valide sans exercices", async () => {
    const { response, body } = await get<ExercisesBody>(
      `/api/exercises?topicId=${emptyTopicId}&subjectId=${subjectId}&seriesId=${seriesId}`
    );

    assert.equal(response.status, 200);
    assert.deepEqual(body.data, []);
    assert.equal(body.pagination.total, 0);
    assert.equal(body.pagination.totalPages, 0);
    assert.equal(body.pagination.hasNext, false);
  });

  test("GET /api/exercises valide la pagination", async () => {
    const queries = [
      "page=0",
      "page=abc",
      "page=9007199254740991&limit=50",
      "limit=0",
      "limit=51",
      "limit=abc",
    ];

    for (const query of queries) {
      const { response, body } = await get<ErrorBody>(
        `/api/exercises?topicId=${topicId}&subjectId=${subjectId}&seriesId=${seriesId}&${query}`
      );
      assert.equal(response.status, 400);
      assert.equal(body.error.code, "INVALID_QUERY");
    }
  });

  test("GET /api/exercises renvoie une page vide hors limites", async () => {
    const { response, body } = await get<ExercisesBody>(
      `/api/exercises?topicId=${topicId}&subjectId=${subjectId}&seriesId=${seriesId}&page=99`
    );

    assert.equal(response.status, 200);
    assert.deepEqual(body.data, []);
    assert.equal(body.pagination.total, 3);
    assert.equal(body.pagination.hasNext, false);
  });

  test("une route inconnue renvoie un 404 JSON", async () => {
    const { response, body } = await get<ErrorBody>("/api/inconnue");

    assert.equal(response.status, 404);
    assert.equal(body.error.code, "ROUTE_NOT_FOUND");
  });
});
