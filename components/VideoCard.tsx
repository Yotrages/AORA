import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

interface CardProps {
  video: any;
}

const VideoCard = ({ video: { name, title, image, thumbnail } }: CardProps) => {

  const [play, setPlay] = useState(false)
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="border border-secondary-200 mt-0.5 w-[46px] h-[46px] rounded-lg justify-center items-center p-0.5">
            <Image 
            source={{ uri: image}}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
            />
          </View>
    <View className="justify-center flex-1 gap-y-1 ml-3">
      <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
      <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>{name}</Text>
    </View>
        </View>

        <View className="pt-2 "> 
        <Image 
        source={icons.menu}
        resizeMode="contain"
        className="w-5 h-5 "/>
        </View>
      </View>

    {play ? (
      <Text className="text-white">Playing</Text>
    ) : (
      <TouchableOpacity className="w-full h-[60px] rounded-xl mt-3 relative justify-center items-center" activeOpacity={0.7} onPress={() => setPlay(true)}>
        <Image 
        source={{uri: thumbnail}}
        className="w-full h-full rounde-xl mt-3"
        resizeMode="cover"/>
        <Image 
        source={icons.play}
        resizeMode="contain"
        className="w-12 h-12 absolute"/>
      </TouchableOpacity>
    )}
    </View>
  );
};

export default VideoCard;
