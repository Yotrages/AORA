import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  containerStyles: string;
  handlePress: () => void;
  textStyles: string;
  isLoading: boolean;
}

const Button = ({
  title,
  containerStyles,
  handlePress,
  textStyles,
  isLoading,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text className={` ${textStyles} text-primary font-psemibold text-lg`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
