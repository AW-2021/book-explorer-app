import {
  Book,
  BookReview,
  GoogleBooksSearchResponse,
  GoogleBooksItem,
  NYTimesArticleSearchResponse,
} from "../types";
import {
  transformGoogleBookToBook,
  transformNYTimesArticleToReview,
} from "../utils/transforms";

const GOOGLE_BOOKS_BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const NYTIMES_ARTICLE_SEARCH_URL =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_BOOKS_API_KEY;
const NYTIMES_API_KEY = process.env.EXPO_PUBLIC_NYTIMES_API_KEY;

export async function searchBooks(
  query: string,
  maxResults: number = 30,
): Promise<Book[]> {
  if (!query.trim()) {
    return [];
  }

  const params = new URLSearchParams({
    q: query,
    maxResults: maxResults.toString(),
    key: GOOGLE_API_KEY || "",
  });

  const response = await fetch(`${GOOGLE_BOOKS_BASE_URL}?${params}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
        `Search failed with status ${response.status}`,
    );
  }

  const data: GoogleBooksSearchResponse = await response.json();

  if (!data.items || data.items.length === 0) {
    return [];
  }
  return data.items.map(transformGoogleBookToBook);
}

export async function getBookById(bookId: string): Promise<Book> {
  const params = new URLSearchParams({
    key: GOOGLE_API_KEY || "",
  });

  const response = await fetch(`${GOOGLE_BOOKS_BASE_URL}/${bookId}?${params}`);

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Book not found");
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
        `Failed to fetch book with status ${response.status}`,
    );
  }

  const data: GoogleBooksItem = await response.json();
  return transformGoogleBookToBook(data);
}

export async function getBookReviews(title?: string): Promise<BookReview[]> {
  if (!title) {
    return [];
  }

  const fq = `"${title}" AND typeOfMaterials:"Review" AND section.name:"Books"`;

  const params = new URLSearchParams({
    "api-key": NYTIMES_API_KEY || "",
    fq: fq,
    sort: "relevance",
  });

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  const response = await fetch(
    `${NYTIMES_ARTICLE_SEARCH_URL}?${params}`,
    options,
  );

  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.fault?.faultstring ||
        `Failed to fetch book reviews with status ${response.status}`,
    );
  }

  const data: NYTimesArticleSearchResponse = await response.json();
  const articles = data.response?.docs || [];

  if (articles.length === 0) {
    return [];
  }

  return articles.map(transformNYTimesArticleToReview);
}
