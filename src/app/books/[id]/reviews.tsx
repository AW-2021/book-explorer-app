import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import BackButton from "@/src/components/BackButton";
import { useBookReviews } from "@/src/hooks/useBookReviews";

export default function ReviewsScreen() {
  const { title } = useLocalSearchParams();
  const { reviews, isLoading, error } = useBookReviews(title as string);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton size={22} />
        <Text style={styles.headerTitle}>Reviews</Text>
        <View style={{ width: 22 }} />
      </View>

      {isLoading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2FB78E" />
        </View>
      )}

      {error && !isLoading && (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {!isLoading && !error && reviews.length === 0 && (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            No reviews available for this book
          </Text>
        </View>
      )}

      {!isLoading && reviews.length > 0 && (
        <ScrollView contentContainerStyle={styles.reviewsList}>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <Text style={styles.reviewSource}>{review.source}</Text>
              <Text style={styles.reviewAuthor}>{review.author}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
              <Text style={styles.reviewSummary}>{review.summary}</Text>
              <Pressable onPress={() => Linking.openURL(review.url)}>
                <Text style={styles.readMoreLink}>Read full review</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#121212",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#E53935",
    fontSize: 14,
  },
  emptyText: {
    color: "#9D9D9D",
    fontSize: 14,
  },
  reviewsList: {
    gap: 20,
  },
  reviewCard: {
    padding: 16,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    gap: 8,
  },
  reviewSource: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2FB78E",
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: "500",
    color: "#121212",
  },
  reviewDate: {
    fontSize: 12,
    color: "#9D9D9D",
  },
  reviewSummary: {
    fontSize: 14,
    color: "#444444",
    lineHeight: 20,
  },
  readMoreLink: {
    fontSize: 14,
    color: "#2FB78E",
    fontWeight: "500",
    marginTop: 4,
  },
});
