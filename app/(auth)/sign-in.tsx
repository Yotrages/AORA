import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { Link } from "expo-router";

const Signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const submission = () => {};
  return (
    <SafeAreaView className="bg-primary w-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-psemibold mt-10 font-semibold">
            Login to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter you Email"
            handleChangeText={(text: string) =>
              setForm({ ...form, email: text })
            }
            otherStyles="mt-7"
            KeyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(text: string) =>
              setForm({ ...form, password: text })
            }
            otherStyles="mt-7"
            KeyboardType="email-address"
          />

          <Button
            title="Sign in"
            handlePress={submission}
            containerStyles="mt-7"
            isLoading={isLoading}
            textStyles=""
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account
            </Text>
            <Link className="text-lg font-psemibold text-secondary" href={'/register'}>
            Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
