import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
  Linking,
  Platform,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import SearchButton from "@/src/components/SearchButton";
import BackButton from "@/src/components/BackButton";
import { useBookDetails } from "@/src/hooks/useBookDetails";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import ErrorMessage from "@/src/components/ErrorMessage";
import RatingStars from "@/src/components/RatingStars";
import { cleanHtml } from "@/src/utils/cleanHtml";
import { Check } from "lucide-react-native";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const { book, isLoading, error } = useBookDetails(id as string);

  const handleReadBook = () => {
    if (book?.previewLink) {
      Linking.openURL(book.previewLink);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton size={22} />
        <SearchButton size={18} />
      </View>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : book ? (
        <View style={styles.content}>
          <ScrollView contentContainerStyle={styles.detailsScrollView}>
            <View style={styles.imageAndTitleSection}>
              {book.thumbnail ? (
                <Image
                  source={{ uri: book.thumbnail }}
                  style={styles.coverImage}
                />
              ) : (
                <View style={styles.placeholderCover}>
                  <Text style={styles.placeholderText}>No Cover</Text>
                </View>
              )}
              <Text style={styles.title}>{book.title}</Text>
              <Text style={styles.authorAndPublishDate}>{book.authors[0]}</Text>
              <Text style={styles.authorAndPublishDate}>
                Published in {book.publishedDate}
              </Text>
            </View>

            <View style={styles.ratingsAndReviewsSection}>
              <RatingStars rating={book.averageRating} />
              <Text style={styles.avgRating}>{book.averageRating}</Text>
              {book.ratingsCount && book.ratingsCount > 0 ? (
                <Link
                  href={{
                    pathname: "/books/[id]/reviews",
                    params: {
                      id: book.id,
                      title: book.title,
                    },
                  }}
                  asChild
                >
                  <Text style={styles.ratingsCount}>
                    (
                    <Text style={{ textDecorationLine: "underline" }}>
                      {book.ratingsCount} review{book.ratingsCount > 1 && "s"}
                    </Text>
                    )
                  </Text>
                </Link>
              ) : (
                <Text>(No reviews)</Text>
              )}
            </View>

            <View style={styles.infoSection}>
              <View style={styles.infoPara}>
                <Text style={styles.infoHeading}>About the author</Text>
                <Text style={styles.infoText}>
                  This book was written by the reknown author{book.authors.length > 0 && 's'}{" "}
                  {book.authors.join(", ")}.
                </Text>
              </View>

              {book.publisher && (
                <View style={styles.infoPara}>
                  <Text style={styles.infoHeading}>Publisher</Text>
                  <Text style={styles.infoText}>{book.publisher}</Text>
                </View>
              )}

              {book.pageCount && (
                <View style={styles.infoPara}>
                  <Text style={styles.infoHeading}>Page Count</Text>
                  <Text style={styles.infoText}>{book.pageCount} pages</Text>
                </View>
              )}

              {book.categories && book.categories.length > 0 && (
                <View style={styles.infoPara}>
                  <Text style={styles.infoHeading}>Categories</Text>
                  <Text style={styles.infoText}>
                    {book.categories?.join(", ")}
                  </Text>
                </View>
              )}

              {book.description && (
                <View style={styles.infoPara}>
                  <Text style={styles.infoHeading}>Overview</Text>
                  <Text style={styles.infoText}>{cleanHtml(book.description)}</Text>
                </View>
              )}
            </View>
          </ScrollView>

          {book.previewLink && (
            <Pressable style={styles.readBtn} onPress={handleReadBook}>
              <Check color="#fff" />
              <Text style={styles.btnText}>Book Read</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <Text>No book info.</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 28,
    gap: 14,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    gap: 14,
  },
  detailsScrollView: {
    alignItems: "center",
    gap: 14,
    paddingRight: 12,
  },
  imageAndTitleSection: {
    gap: 4,
    alignItems: "center",
  },
  coverImage: {
    width: 196,
    height: 300,
    borderRadius: 20,
    backgroundColor: "#E8E8E8",
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#06070D",
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.5,
        shadowRadius: 14,
      },
      android: {
        elevation: 7,
        shadowColor: "#06070D",
      },
    }),
  },
  placeholderCover: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#9D9D9D",
    fontSize: 12,
  },
  title: {
    color: "#19191B",
    fontSize: 18,
    fontWeight: 700,
  },
  authorAndPublishDate: {
    fontSize: 16,
    color: "#9D9D9D",
  },
  ratingsAndReviewsSection: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  avgRating: {
    color: "#19191B",
    fontSize: 14,
  },
  ratingsCount: {
    color: "#19191B",
    fontSize: 13,
  },
  infoSection: {
    gap: 14,
    marginTop: 8,
    marginBottom: 12,
  },
  infoPara: {
    gap: 6,
  },
  infoHeading: {
    fontSize: 18,
    fontWeight: 700,
    color: "#19191B",
  },
  infoText: {
    fontSize: 14,
    color: "#9D9D9D",
    textAlign: "justify",
  },
  readBtn: {
    height: 55,
    backgroundColor: "#55D4AE",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 2,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
});
