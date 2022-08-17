import {
  CiNiiClient,
  CiNiiEnv,
  CiNiiResult,
  FormatType,
  SearchType,
} from "../mod.ts";
import { assert, assertEquals, assertStringIncludes } from "../deps.ts";

const appId = CiNiiEnv.APP_ID;

const searchTypes: SearchType[] = [
  "all",
  "articles",
  "books",
  "data",
  "dissertations",
  "projects",
];

const formatTypes: FormatType[] = [
  "atom",
  "html",
  "json",
  "rss",
];

Deno.test("simple get", async () => {
  await Promise.all(searchTypes.flatMap((searchType) => {
    return Promise.all(formatTypes.map(async (formatType) => {
      const client = new CiNiiClient({ appId });
      const res = await client.get(searchType, formatType, {
        q: "DALL E",
      });

      switch (formatType) {
        case "atom":
        case "rss": {
          const xml = await res.text();

          assert(xml.startsWith("<?xml"));
          break;
        }
        case "json": {
          const result: CiNiiResult = await res.json();

          assertStringIncludes(result.title, "DALL E");
          break;
        }
        case "html": {
          const html = await res.text();
          assert(html.startsWith("<!DOCTYPE html"));
        }
      }
    }));
  }));
});

Deno.test("all search", async () => {
  const client = new CiNiiClient({ appId });
  const res = await client.all({
    q: "Python",
    count: 100,
  });

  assertEquals(res.title, "CiNii Research all - Python 100 json");

  assertEquals(res.items.length, 100);
});

Deno.test("data search", async () => {
  const client = new CiNiiClient({ appId });
  const res = await client.data({
    q: "Python",
    count: 10,
  });

  assertEquals(res.title, "CiNii Research data - Python 10 json");

  assertEquals(res.items.length, 10);
});

Deno.test("articles search", async () => {
  const client = new CiNiiClient({ appId });
  const res = await client.articles({
    q: "Python",
    count: 100,
  });

  assertEquals(res.title, "CiNii Research articles - Python 100 json");

  assertEquals(res.items.length, 100);
});

Deno.test("books search", async () => {
  const client = new CiNiiClient({ appId });
  const res = await client.books({
    q: "Python",
    count: 100,
  });

  assertEquals(res.title, "CiNii Research books - Python 100 json");

  assertEquals(res.items.length, 100);
});

Deno.test("dissertations search", async () => {
  const client = new CiNiiClient({ appId });
  const res = await client.dissertations({
    q: "Python",
    count: 3,
  });

  assertEquals(res.title, "CiNii Research dissertations - Python 3 json");

  assertEquals(res.items.length, 3);
});

Deno.test("projects search", async () => {
  const client = new CiNiiClient({ appId });
  const res = await client.projects({
    q: "Python",
    count: 100,
  });

  assertEquals(res.title, "CiNii Research projects - Python 100 json");

  assertEquals(res.items.length, 100);
});
