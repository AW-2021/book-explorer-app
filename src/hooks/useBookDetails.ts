import { useState, useEffect } from "react";
import { Book } from "../types";
import { getBookById } from "../services/api";

export function useBookDetails(bookId: string) {
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBook() {
      setIsLoading(true);
      setError(null);

      try {
        const bookData = await getBookById(bookId);
        setBook(bookData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load book");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBook();
  }, [bookId]);

  return { book, isLoading, error };
}
