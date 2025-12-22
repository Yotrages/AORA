import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { icons } from "@/constants";
import Button from "@/components/Button";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = (selectType: string) => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: selectType === 'image' ? ImagePicker.MediaTypesOptions.Images : ImagePicker.MediaTypeOptions.Videos,
    //   aspect: [4, 3],
    //   quality: 1,
    // })

    // if (!result.canceled) {
    //   if (selectType === 'image') {
    //     setForm({...form, thumbnail: result.assets[0]})
    //   }
    //   if (selectType === 'video') {
    //     setForm({...form, video: result.assets[0]})
    //   }
    // } else {
    //   setTimeout(() => {
    //     Alert.alert('Document piced', JSON.stringify(result, null, 2))
    //   }, 100)
    // }
  }

  const submission = () => {

  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title="Video Title"
          placeholder="Give your video a catchy title"
          value={form.title}
          handleChangeText={(text: string) => setForm({ ...form, title: text })}
          otherStyles="mt-10"
          KeyboardType=""
        />

        <View className="mt-7 space-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              // You are to use an expo Av video
              <Text></Text>
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="border border-secondary-200 w-14 h-14 border-dashed justify-center items-center">
              <Image 
              source={icons.upload}
              resizeMode="contain"
              className="w-1/2 h-1/2"
              />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
        <Text className="text-base text-gray-100 font-pmedium">
           Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image 
              source={{ uri: form.thumbnail}}
              className="w-full h-64 rounded-2xl"
              resizeMode="cover"
              />
            ) : (
              <View className="w-full h-16 border-2 border-black-200 flex-row space-x-2 px-4 bg-black-100 rounde-2xl justify-center items-center">
              <Image 
              source={icons.upload}
              resizeMode="contain"
              className="w-1/2 h-1/2"
              />
              <Text className="text-sm text-gray-100 font-pmedium">
                Choose a file
              </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Ai Prompt"
          placeholder="Pick a prompt..."
          value={form.prompt}
          handleChangeText={(text: string) => setForm({ ...form, prompt: text })}
          otherStyles="mt-7"
          KeyboardType=""
        />

        <Button 
        title="Submit and Publish"
        handlePress={submission}
        containerStyles="mt-7"
        isLoading={loading}
        textStyles=""
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
