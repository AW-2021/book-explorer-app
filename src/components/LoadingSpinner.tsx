import { ActivityIndicator, View, StyleSheet } from "react-native";

interface LoadingSpinnerProps {
  size?: "small" | "large";
}

export default function LoadingSpinner({
  size = "large",
}: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color="#2FB78E" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
