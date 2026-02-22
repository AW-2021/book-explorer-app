import { View, Text, Pressable, StyleSheet } from "react-native";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Pressable style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    gap: 12,
    borderRadius: 5,
    backgroundColor: "#fccbc7",
  },
  message: {
    fontSize: 16,
    fontWeight: 500,
    color: "#ed1f11",
    textAlign: "center",
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#2FB78E",
    borderRadius: 6,
  },
  retryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
});
