import { Text, View, Image, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.img}
        source={require("../../assets/images/books.jpg")}
      />
      <Text style={styles.heading}>WELCOME TO BOOK EXPLORER!</Text>
      <Link href="/search" style={styles.link}>
        <Text style={styles.linkText}>Start Your Search!</Text>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
    gap: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  img: {
    height: 250,
    width: "90%",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.5,
        shadowRadius: 14,
      },
      android: {
        elevation: 5,
        shadowColor: "#000",
      },
    }),
  },
  heading: {
    fontSize: 28,
    fontWeight: 800,
    textAlign: "center",
    paddingHorizontal: 14,
    color: "#2FB78E"
  },
  link: {
    height: 55,
    backgroundColor: "#55D4AE",
    borderRadius: 10,
    paddingHorizontal: 18,
    textAlign: "center",
    verticalAlign: "middle",
  },
  linkText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: 500,
  },
});
