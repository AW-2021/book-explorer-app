import { useState, useMemo, useRef } from "react";
import { Book } from "../types";
import { searchBooks } from "../services/api";
import { throttle } from "../utils/throttle";

const THROTTLE_INTERVAL = 200;

export function useBookSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const latestQueryRef = useRef("");

  const throttledSearch = useMemo(
    () =>
      throttle(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
          return;
        }

        setIsLoading(true);

        try {
          const books = await searchBooks(searchQuery);

          if (latestQueryRef.current === searchQuery) {
            setResults(books);
            setError(null);
          }
        } catch (err) {
          if (latestQueryRef.current === searchQuery) {
            setError(err instanceof Error ? err.message : "Search failed");
            setResults([]);
          }
        } finally {
          setIsLoading(false);
        }
      }, THROTTLE_INTERVAL),
    [],
  );

  const handleQueryChange = (text: string) => {
    latestQueryRef.current = text;

    if (!text.trim()) {
      clearSearch();
      return;
    }

    setQuery(text);
    setError(null);
    throttledSearch(text);
  };

  const clearSearch = () => {
    latestQueryRef.current = "";
    setQuery("");
    setResults([]);
    setError(null);
    setIsLoading(false);
  };

  return {
    query,
    handleQueryChange,
    clearSearch,
    results,
    isLoading,
    error,
  };
}
