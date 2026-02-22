import { useState } from "react";
import { SearchIcon } from "lucide-react-native";
import { View, TextInput, StyleSheet } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.searchBar, isFocused && styles.inputFocused]}>
      <SearchIcon color="#A6A6A6" size={24} />
      <TextInput
        placeholder="Book title or author"
        placeholderTextColor="#A6A6A6"
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "sans-serif",
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: "#55D4AE",
    backgroundColor: "#ffffff",
  },
});
