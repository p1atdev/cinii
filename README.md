# CiNii Research API Client for Deno

![deno compatibility](https://shield.deno.dev/deno/^1.24)
[![deno module](https://shield.deno.dev/x/cinii)](https://deno.land/x/cinii])
![Test](https://github.com/p1atdev/cinii/actions/workflows/test.yaml/badge.svg)

# Usage

- search from all types

```ts
import { CiNiiClient } from "https://deno.land/x/cinii/mod.ts";

const client = new CiNiiClient({ appId: "your_app_id" }); // or, if not specified, refer to the environment variable CINII_APP_ID

const res = await client.all({
  q: "QUIC",
  count: 100,
});

assertEquals(res.items.length, 100);

const titles = res.items.map((i) => i.title);

assertArrayIncludes(titles, [
  "Improving the performance of HTTP/3 communications when communicating simultaneously which uses CUBIC TCP and TCP BBR",
]);
```

- search from only books

```ts
const client = new CiNiiClient({ appId });

const res = await client.books({
  q: "Python",
  count: 200,
});

assert(res.items.every((i) => i["dc:type"] === "Book"));
```

- supports all query options

```ts
import { datetime } from "https://deno.land/x/ptera@v1.0.2/mod.ts"; // Date library

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
```

# Query Reference

**[クエリ仕様 - CiNii Research の OpenSearch](https://support.nii.ac.jp/ja/cir/r_opensearch#query)**
