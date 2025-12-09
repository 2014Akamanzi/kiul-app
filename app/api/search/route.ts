import fs from "fs";
import path from "path";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  if (!q) {
    return new Response(JSON.stringify([]), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const base = path.join(process.cwd(), "public/publications");

  const categories = [
    "books",
    "spiritual",
    "cjdj",
    "working-papers",
    "proceedings",
    "blogs",
  ];

  let results: any[] = [];

  for (const cat of categories) {
    const folder = path.join(base, cat);

    if (!fs.existsSync(folder)) continue;

    try {
      const items = fs.readdirSync(folder);

      items.forEach((item) => {
        const full = path.join(folder, item);
        const stat = fs.statSync(full);

        if (stat.isFile() && item.toLowerCase().includes(q)) {
          results.push({
            title: item.replace(/\.(pdf|md|txt)$/i, ""),
            category: cat,
            path: `/publications/${cat}/${item}`,
          });
        }
      });
    } catch (error) {
      console.error(`Error reading ${cat}:`, error);
    }
  }

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
}
