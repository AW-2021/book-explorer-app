import { Book, BookReview, GoogleBooksItem, NYTimesArticle } from "../types";

export function transformGoogleBookToBook(item: GoogleBooksItem): Book {
  const { volumeInfo, id } = item;

  const isbn =
    volumeInfo.industryIdentifiers?.find((id) => id.type === "ISBN_13")
      ?.identifier ||
    volumeInfo.industryIdentifiers?.find((id) => id.type === "ISBN_10")
      ?.identifier;

  return {
    id,
    title: volumeInfo.title,
    authors: volumeInfo.authors || ["Unknown Author"],
    publishedDate: volumeInfo.publishedDate,
    description: volumeInfo.description,
    thumbnail: volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://"),
    averageRating: volumeInfo.averageRating,
    ratingsCount: volumeInfo.ratingsCount,
    pageCount: volumeInfo.pageCount,
    categories: volumeInfo.categories,
    publisher: volumeInfo.publisher,
    previewLink: volumeInfo.previewLink,
    infoLink: volumeInfo.infoLink,
    isbn,
    language: volumeInfo.language,
  };
}

export function transformNYTimesArticleToReview(
  article: NYTimesArticle,
  index: number,
): BookReview {
  return {
    id: `nyt-${index}-${article._id}`,
    source: "The New York Times",
    author: article.byline?.original || "NYTimes Staff",
    date: article.pub_date?.split("T")[0] || "",
    summary: article.abstract || article.lead_paragraph || "",
    url: article.web_url,
  };
}
