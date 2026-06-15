import { useEffect, useState } from "react";
import type { Article } from "@/api/types";
import { searchNews } from "@/api/newsApi";

export function useSearch(query: string) {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!query) {
      setData([]);
      return;
    }
    setLoading(true);
    searchNews(query)
      .then((res) => !cancelled && setData(res))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [query]);

  return { data, loading };
}
