// JSON endpoint used by the shop's "Load more" button.
// It runs on the server, so the Ecwid token never reaches the browser.
// Like every other read on this site, it can only return products from the fragrance category.
import { getProducts, SORTS } from "../../../lib/ecwid";

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const sort = params.get("sort") || "";
  const result = await getProducts({
    categoryId: Number(params.get("category")) || 0,
    keyword: (params.get("q") || "").slice(0, 100),
    sort: sort in SORTS ? sort : "",
    offset: Math.max(0, Math.floor(Number(params.get("offset")) || 0)),
  });
  return Response.json(result, { status: result.error ? 502 : 200 });
}
