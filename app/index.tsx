import { View, Text, ScrollView, Image, } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import Button from '@/components/Button'

const App = () => {
  return (
    <SafeAreaView className='w-full bg-primary'>
      <ScrollView>
        <View className='w-full px-4 justify-center items-center max-h-[85vh]'>
        <Image 
        source={images.logo}
        className='w-[130px] h-[84px]'
        resizeMode='contain'
        />
        <Image 
        source={images.cards}
        resizeMode='contain'
        className='max-w-[380px] w-full h-[300px]'
        />

        <View className='relative mt-5'>
      <Text className='text-3xl text-white font-bold text-center'>
      Discover Endless possibilities with {' '}
      <Text className='text-secondary-200'>Aora</Text>
      </Text>
      <Image 
      source={images.path}
      className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
      resizeMode='contain'/>
        </View>
        <Text className='text-sm text-gray-100 mt-7 text-center'>
        Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
        </Text>
        <Button 
        title='Continue with Email'
        handlePress={() => router.push('/sign-in')}
        containerStyles='w-full mt-7'
        textStyles=''
        isLoading={false}/>
        </View>
      </ScrollView>
      <StatusBar 
      backgroundColor='#161622' style='light'/>
     </SafeAreaView>
  )
}

export default App