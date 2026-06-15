import { useEffect, useState } from "react";
import type { Article } from "@/api/types";
import {
  getAllNews,
  getLatestNews,
  getTrendingNews,
  getNewsByCategory,
  getNewsBySlug,
} from "@/api/newsApi";

type Mode =
  | { kind: "all" }
  | { kind: "latest" }
  | { kind: "trending" }
  | { kind: "category"; value: string };

function useAsyncList(mode: Mode) {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetcher =
      mode.kind === "latest"
        ? getLatestNews()
        : mode.kind === "trending"
          ? getTrendingNews()
          : mode.kind === "category"
            ? getNewsByCategory(mode.value)
            : getAllNews();

    fetcher
      .then((res) => !cancelled && setData(res))
      .catch((e) => !cancelled && setError(String(e)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [mode.kind, mode.kind === "category" ? mode.value : ""]);

  return { data, loading, error };
}

export const useAllNews = () => useAsyncList({ kind: "all" });
export const useLatestNews = () => useAsyncList({ kind: "latest" });
export const useTrendingNews = () => useAsyncList({ kind: "trending" });
export const useCategoryNews = (category: string) =>
  useAsyncList({ kind: "category", value: category });

export function useArticleBySlug(slug: string) {
  const [data, setData] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getNewsBySlug(slug)
      .then((res) => !cancelled && setData(res))
      .catch((e) => !cancelled && setError(String(e)))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { data, loading, error };
}
