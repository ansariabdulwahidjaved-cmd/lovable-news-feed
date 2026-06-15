import { useCallback, useEffect, useState } from "react";

const KEY = "newshub:bookmarks";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function useBookmarks() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setIds(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = (next: string[]) => {
    setIds(next);
    window.localStorage.setItem(KEY, JSON.stringify(next));
  };

  const toggle = useCallback(
    (id: string) => {
      const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
      persist(next);
    },
    [ids],
  );

  const remove = useCallback(
    (id: string) => {
      persist(ids.filter((x) => x !== id));
    },
    [ids],
  );

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, toggle, remove, has };
}
