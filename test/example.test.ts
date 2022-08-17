import { CiNiiClient, CiNiiEnv } from "../mod.ts";
import {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertExists,
  assertNotEquals,
  datetime,
} from "../deps.ts";

const appId = CiNiiEnv.APP_ID;

Deno.test("example: search from all types", async () => {
  const client = new CiNiiClient({ appId });
  const res = await client.all({
    q: "QUIC",
    count: 100,
  });

  assertEquals(res.items.length, 100);

  const titles = res.items.map((i) => i.title);

  assertArrayIncludes(titles, [
    "Improving the performance of HTTP/3 communications when communicating simultaneously which uses CUBIC TCP and TCP BBR",
  ]);
});

Deno.test("example: search from only books", async () => {
  const client = new CiNiiClient({ appId });
  const res = await client.books({
    q: "Python",
    count: 200,
  });

  assert(res.items.every((i) => i["dc:type"] === "Book"));
});

Deno.test("example: specify some options", async () => {
  const client = new CiNiiClient({ appId });
  const res = await client.all({
    q: "拾遺和歌集",
    count: 10,
    dataSourceType: "KAKEN",
    from: datetime({
      year: 2022,
      month: 4,
    }),
  });

  assertExists(res.items[0].title);
});
