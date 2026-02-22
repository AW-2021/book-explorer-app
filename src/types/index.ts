export interface Book {
  id: string;
  title: string;
  authors: string[];
  publishedDate?: string;
  description?: string;
  thumbnail?: string;
  averageRating?: number;
  ratingsCount?: number;
  pageCount?: number;
  categories?: string[];
  publisher?: string;
  previewLink?: string;
  infoLink?: string;
  isbn?: string;
  language?: string;
}

export interface GoogleBooksVolumeInfo {
  title: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
  averageRating?: number;
  ratingsCount?: number;
  pageCount?: number;
  categories?: string[];
  publisher?: string;
  previewLink?: string;
  infoLink?: string;
  industryIdentifiers?: Array<{
    type: string;
    identifier: string;
  }>;
  language?: string;
}

export interface GoogleBooksItem {
  id: string;
  volumeInfo: GoogleBooksVolumeInfo;
}

export interface GoogleBooksSearchResponse {
  totalItems: number;
  items?: GoogleBooksItem[];
}

export interface NYTimesArticle {
  _id: string;
  web_url: string;
  pub_date: string;
  abstract: string;
  lead_paragraph: string;
  byline?: {
    original: string;
  };
}

export interface NYTimesArticleSearchResponse {
  response: {
    docs: NYTimesArticle[];
  };
}

export interface BookReview {
  id: string;
  source: string;
  author: string;
  date: string;
  summary: string;
  url: string;
}

export interface SearchState {
  query: string;
  results: Book[];
  isLoading: boolean;
  error: string | null;
}

export interface BookDetailsState {
  book: Book | null;
  reviews: BookReview[];
  isLoading: boolean;
  isLoadingReviews: boolean;
  error: string | null;
  reviewsError: string | null;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}
