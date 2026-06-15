import type { Article, ContactFormData } from "./types";
import { mockArticles } from "@/data/mockNews";
// import { ENDPOINTS } from "./endpoints";

/**
 * NOTE: All functions currently return mock data.
 * Replace the mock returns with `fetch(ENDPOINTS.xxx)` (or axios) when the
 * backend is ready. The mock delay simulates network latency.
 */
const delay = <T>(data: T, ms = 350): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export async function getAllNews(): Promise<Article[]> {
  // return fetch(ENDPOINTS.allNews).then(r => r.json());
  return delay(mockArticles);
}

export async function getLatestNews(): Promise<Article[]> {
  // return fetch(ENDPOINTS.latestNews).then(r => r.json());
  const sorted = [...mockArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  return delay(sorted);
}

export async function getTrendingNews(): Promise<Article[]> {
  // return fetch(ENDPOINTS.trendingNews).then(r => r.json());
  return delay(mockArticles.filter((a) => a.isTrending));
}

export async function getNewsByCategory(category: string): Promise<Article[]> {
  // return fetch(ENDPOINTS.newsByCategory(category)).then(r => r.json());
  const filtered = mockArticles.filter(
    (a) => a.category.toLowerCase() === category.toLowerCase(),
  );
  return delay(filtered);
}

export async function getNewsBySlug(slug: string): Promise<Article | null> {
  // return fetch(ENDPOINTS.newsBySlug(slug)).then(r => r.json());
  return delay(mockArticles.find((a) => a.slug === slug) ?? null);
}

export async function searchNews(query: string): Promise<Article[]> {
  // return fetch(ENDPOINTS.searchNews(query)).then(r => r.json());
  const q = query.trim().toLowerCase();
  if (!q) return delay([]);
  return delay(
    mockArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)) ||
        a.category.toLowerCase().includes(q),
    ),
  );
}

export async function submitNewsletter(email: string): Promise<{ ok: true }> {
  // return fetch(ENDPOINTS.newsletter, { method: "POST", body: JSON.stringify({ email }) })
  console.info("[mock] newsletter subscription:", email);
  return delay({ ok: true }, 600);
}

export async function submitContactForm(data: ContactFormData): Promise<{ ok: true }> {
  // return fetch(ENDPOINTS.contact, { method: "POST", body: JSON.stringify(data) })
  console.info("[mock] contact submission:", data);
  return delay({ ok: true }, 700);
}

export async function submitComment(
  articleId: string,
  comment: { author: string; content: string },
): Promise<{ ok: true }> {
  // return fetch(ENDPOINTS.comments, { method: "POST", body: JSON.stringify({ articleId, ...comment }) })
  console.info("[mock] comment on", articleId, comment);
  return delay({ ok: true }, 500);
}
