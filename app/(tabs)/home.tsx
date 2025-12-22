import { View, Text, ScrollView, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import useConnection from '@/lib/Connection'
import VideoCard from '@/components/VideoCard'


const posts = [
  {id: '1', name: 'fola'}, {id: '2', name: 'sade'}, {id: '3', name: 'julian'}
]
const Home = () => {
  const {data: posts, refetch} = useConnection()

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
   await refetch();
    setRefreshing(false)
  }
  return (
   <>
   <SafeAreaView className='bg-primary w-full h-full'>
    <FlatList 
    data={posts}
    keyExtractor={(item) => item.id}
    renderItem={({item}) => (
      <VideoCard 
      video={item}/>
    )}
    ListHeaderComponent={() => (
      <View className='my-6 px-4 space-y-6'>
        <View className='justify-between items-start flex-row mb-6'>
          <View className=''>
            <Text className='font-pmedium text-sm text-gray-100'>Welcome Back</Text>
            <Text className='text-2xl font-psemibold text-white'>Qayyum</Text>
          </View>

          <View className='mt-1.5 '>
          <Image 
          source={images.logoSmall}
          resizeMode='contain'
          className='w-9 h-9'/>
          </View>
        </View>

        <SearchInput 
        placeholder='Search for videos...'
        value=''
        handleChangeText={(text: string) => {}}
        />

        <View className='w-full flex-1 pt-5 pb-8'>
          <Text className='text-gray-100 text-lg font-pregular mb-3'>
          Latest Videos
          </Text>
          <Trending 
          posts={posts ?? []}
      />
        </View>
      </View>
    )}
    ListEmptyComponent={() => (
      <EmptyState 
      title='No Videos found'
      subtitle='Be the first to upload a video'/>
    )}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
    />
   </SafeAreaView>
   </>
  )
}

export default Home