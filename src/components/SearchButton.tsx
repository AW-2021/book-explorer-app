import { Pressable } from "react-native";
import { SearchIcon } from "lucide-react-native";
import { Link } from "expo-router";

interface SearchButtonProps {
  size?: number;
}

const SearchButton = ({ size = 18 }: SearchButtonProps) => {
  return (
    <Link href="/search">
      <SearchIcon size={size} />
    </Link>
  );
};

export default SearchButton;
