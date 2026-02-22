import { searchBooks, getBookById, getBookReviews } from "../../services/api";

// Mock fetch globally
global.fetch = jest.fn();

describe("API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("searchBooks", () => {
    it("returns empty array for empty query", async () => {
      const result = await searchBooks("");

      expect(result).toEqual([]);
      expect(fetch).not.toHaveBeenCalled();
    });

    it("returns empty array for whitespace query", async () => {
      const result = await searchBooks("   ");

      expect(result).toEqual([]);
      expect(fetch).not.toHaveBeenCalled();
    });

    it("returns transformed books on successful search", async () => {
      const mockResponse = {
        totalItems: 1,
        items: [
          {
            id: "book1",
            volumeInfo: {
              title: "Test Book",
              authors: ["Test Author"],
            },
          },
        ],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await searchBooks("test");

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("book1");
      expect(result[0].title).toBe("Test Book");
    });

    it("returns empty array when no items found", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ totalItems: 0 }),
      });

      const result = await searchBooks("nonexistent");

      expect(result).toEqual([]);
    });

    it("throws error on failed request", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: { message: "Server error" } }),
      });

      await expect(searchBooks("test")).rejects.toThrow("Server error");
    });
  });

  describe("getBookById", () => {
    it("returns transformed book on success", async () => {
      const mockBook = {
        id: "book123",
        volumeInfo: {
          title: "Specific Book",
          authors: ["Author Name"],
        },
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockBook,
      });

      const result = await getBookById("book123");

      expect(result.id).toBe("book123");
      expect(result.title).toBe("Specific Book");
    });

    it("throws 'Book not found' for 400 status", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({}),
      });

      await expect(getBookById("invalid")).rejects.toThrow("Book not found");
    });
  });

  describe("getBookReviews", () => {
    it("returns empty array when no title provided", async () => {
      const result = await getBookReviews();

      expect(result).toEqual([]);
      expect(fetch).not.toHaveBeenCalled();
    });

    it("returns transformed reviews on success", async () => {
      const mockResponse = {
        response: {
          docs: [
            {
              _id: "review1",
              web_url: "https://nytimes.com/review",
              pub_date: "2023-01-01T00:00:00Z",
              abstract: "Great book",
              lead_paragraph: "Lead",
              byline: { original: "By Reviewer" },
            },
          ],
        },
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getBookReviews("Test Book");

      expect(result).toHaveLength(1);
      expect(result[0].source).toBe("The New York Times");
      expect(result[0].summary).toBe("Great book");
    });

    it("returns empty array for 404 status", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({}),
      });

      const result = await getBookReviews("Unknown Book");

      expect(result).toEqual([]);
    });
  });
});
