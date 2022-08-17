export class CiNIiiURL {
  static OpenSearch = "https://cir.nii.ac.jp/opensearch";
}

export class CiNiiEnv {
  static APP_ID = Deno.env.get("APP_ID") || "";
}
