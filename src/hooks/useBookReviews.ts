import { useState, useEffect } from "react";
import { BookReview } from "../types";
import { getBookReviews } from "../services/api";

export function useBookReviews(title: string) {
  const [reviews, setReviews] = useState<BookReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      if (!title) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const reviewsData = await getBookReviews(title);
        setReviews(reviewsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load reviews");
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, [title]);

  return { reviews, isLoading, error };
}
