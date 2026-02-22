import { Pressable } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

interface BackButtonProps {
  size?: number;
}

function BackButton({ size = 18 }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <Pressable onPress={handleBack}>
      <ArrowLeft size={size} color="#19191B" />
    </Pressable>
  );
}

export default BackButton;
