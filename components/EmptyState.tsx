import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import Button from "./Button";
import { router } from "expo-router";

interface EmptyProps {
  title: string;
  subtitle: string;
}
const EmptyState = ({ title, subtitle }: EmptyProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        resizeMode="contain"
        source={images.empty}
        className="w-[270px] h-[215px]"
      />
      <Text className="text-xl text-center mt-2 font-psemibold text-white">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <Button 
      title="Create Video"
      handlePress={() => router.push('/create')}
      containerStyles="mt-4"
      textStyles=""
      isLoading/>
    </View>
  );
};

export default EmptyState;
