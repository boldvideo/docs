import { stat } from "node:fs/promises";
import type { MetadataRoute } from "next";
import { BASE_URL, source } from "@/lib/source";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return Promise.all(
    source.getPages().map(async (page) => ({
      url: `${BASE_URL}${page.url}`,
      lastModified:
        page.data.updated_at ?? (await stat(page.data.info.fullPath)).mtime,
    })),
  );
}
