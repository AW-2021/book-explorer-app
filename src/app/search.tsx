import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

import BackButton from "../components/BackButton";
import SearchBar from "../components/SearchBar";
import { useBookSearch } from "../hooks/useBookSearch";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function SearchScreen() {
  const { query, handleQueryChange, results, isLoading, error } = useBookSearch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton size={22} />
        <Text style={styles.headerText}>Search Book</Text>
      </View>

      <View style={styles.searchAndResultsContainer}>
        <View style={styles.searchContainer}>
          <SearchBar value={query} onChangeText={handleQueryChange} />
        </View>

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : query.trim() && results.length <= 0 ? (
          <View style={styles.centeredMessage}>
            <Text style={styles.hintText}>No books found for "{query}"</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.resultsContainer}>
            {results.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`}>
                <View style={styles.resultItem}>
                  <Text style={styles.resultTitle}>
                    {book.title} + {book.ratingsCount}
                  </Text>
                  <Text style={styles.resultAuthor}>
                    by {book.authors.join(", ")}
                  </Text>
                </View>
              </Link>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 14,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "Helvetica",
    fontWeight: 400,
    fontSize: 18,
    color: "#121212",
    marginHorizontal: "auto",
  },
  searchAndResultsContainer: {
    flex: 1,
    gap: 14,
  },
  searchContainer: {
    paddingVertical: 8,
  },
  resultsContainer: {
    gap: 16,
  },
  resultItem: {},
  resultTitle: {
    color: "#2FB78E",
    fontSize: 16,
    fontWeight: 500,
  },
  resultAuthor: {
    fontSize: 14,
    color: "#9D9D9D",
  },
  centeredMessage: {
    paddingVertical: 20,
    alignItems: "center",
  },
  hintText: {
    color: "#9D9D9D",
    fontSize: 14,
  },
});