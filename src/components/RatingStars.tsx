import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface RatingStarsProps {
  rating?: number;
}

export default function RatingStars({ rating }: RatingStarsProps) {
  if (!rating) {
    return <Text style={styles.noRating}>No ratings yet</Text>;
  }

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesome
            key={`full-${i}`}
            name="star"
            size={16}
            color="#FFCE31"
          />
        ))}

        {hasHalfStar && (
          <FontAwesome name="star-half-full" size={16} color="#FFCE31" />
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesome
            key={`empty-${i}`}
            name="star"
            size={16}
            color="#E4E4E4"
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stars: {
    flexDirection: "row",
  },
  noRating: {
    fontSize: 14,
    color: "#9D9D9D",
  },
});
