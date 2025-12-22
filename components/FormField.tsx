import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants';

interface Formprops {
    title: string;
    value: string;
    handleChangeText: (text: string) => void;
    otherStyles: string;
    KeyboardType: string;
    placeholder: string;
}
const FormField = ({title, placeholder, value, handleChangeText, otherStyles, KeyboardType} : Formprops) => {

    const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className='w-full h-16 px-4 flex-row bg-black-100 rounded-2xl focus:border-secondary-200 border border-black-200'>
    <TextInput 
    className='flex-1 text-white text-base font-psemibold'
    value={value}
    placeholder={placeholder}
    placeholderTextColor={'#7b7b8b'}
    onChangeText={handleChangeText}
    secureTextEntry={title === 'password' && !showPassword}
    />

    {title === 'password' && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image 
            className='w-6 h-6'
            resizeMode='contain'
            source={!showPassword ? icons.eye : icons.eyeHide}/>
        </TouchableOpacity>
    )}
      </View>
    </View>
  )
}

export default FormField