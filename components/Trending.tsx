import { View, Text, FlatList } from 'react-native'
import React from 'react'

interface Trending {
    posts: {id: string, name: string}[];
}
// React Native Animatable
const Trending = ({posts } : Trending) => {
  return (
    <FlatList 
    data={posts}
    keyExtractor={(item) => item.id}
    renderItem={({item}) => (
        <Text className='text-3xl text-white'>{item.name}</Text>
    )}
    horizontal
    />
  )
}

export default Trending