import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';

interface Formprops {
    value: string;
    handleChangeText: (text: string) => void;
    placeholder: string;
}
const SearchInput = ({ placeholder, value, handleChangeText} : Formprops) => {

  return (
    
      <View className='w-full h-16 px-4 flex-row bg-black-100 rounded-2xl space-x-4 focus:border-secondary-200 border border-black-200'>
    <TextInput 
    className='flex-1 text-white mt-0.5 text-base font-pregular'
    value={value}
    placeholder={placeholder}
    placeholderTextColor={'#7b7b8b'}
    onChangeText={handleChangeText}
    />

   <TouchableOpacity>
    <Image 
    source={icons.search}
    resizeMode='contain' 
    className='w-5 h-5'
    />
   </TouchableOpacity>
      </View>

  )
}

export default SearchInput