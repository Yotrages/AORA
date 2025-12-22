import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

// Define Zod schema for form validation
const formSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'Full name must be at least 3 characters' })
    .max(50, { message: 'Full name must not exceed 50 characters' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, { 
      message: 'Password must contain uppercase, lowercase, and number' 
    }),
  confirmPassword: z
    .string(),
  bio: z
    .string()
    .max(250, { message: 'Bio cannot exceed 250 characters' })
    .optional(),
})
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Define the form data type
type FormData = z.infer<typeof formSchema> & {
  profileImage?: { uri: string; name: string; type: string } | null;
  document?: { uri: string; name: string; type: string; size: number } | null;
};

const RegisterForm = () => {
  // File states (handled separately from react-hook-form as they're not text inputs)
  const [profileImage, setProfileImage] = useState<any>(null);
  const [document, setDocument] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize react-hook-form with zod resolver
  const { 
    control, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    watch 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      bio: '',
    }
  });

  // Watch bio field for character count
  const bioValue = watch('bio') || '';

  // Pick image from device
  const pickImage = async () => {
    // Request permission first
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your media library');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const name = uri.split('/').pop() || 'image.jpg';
      const type = 'image/' + (name.split('.').pop()?.toLowerCase() === 'png' ? 'png' : 'jpeg');
      
      setProfileImage({
        uri,
        name,
        type,
      });
    }
  };

  // Pick document file
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 
               'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });
      
      if (result.canceled === false) {
        const asset = result.assets[0];
        setDocument({
          uri: asset.uri,
          name: asset.name,
          type: asset.mimeType,
          size: asset.size,
        });
      }
    } catch (err) {
      console.error('Error picking document:', err);
      Alert.alert('Error', 'Failed to select document');
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // Create FormData object for multipart/form-data submission
      const formDataForUpload = new FormData();
      
      // Append text fields
      formDataForUpload.append('fullName', data.fullName);
      formDataForUpload.append('email', data.email);
      formDataForUpload.append('password', data.password);
      
      if (data.bio) {
        formDataForUpload.append('bio', data.bio);
      }
      
      // Add profile image if selected
      if (profileImage) {
        formDataForUpload.append('profileImage', {
          uri: profileImage.uri,
          name: profileImage.name,
          type: profileImage.type,
        } as any);
      }
      
      // Add document if selected
      if (document) {
        formDataForUpload.append('document', {
          uri: document.uri,
          name: document.name,
          type: document.type,
        } as any);
      }

      // Make API request using Axios
      const response = await axios.post(
        'https://your-api-endpoint.com/register', 
        formDataForUpload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
          timeout: 10000, // 10 seconds timeout
        }
      );
      
      console.log('Registration successful:', response.data);
      Alert.alert('Success', 'Registration completed successfully!');
      
      // Reset form after successful submission
      reset();
      setProfileImage(null);
      setDocument(null);
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || 'An error occurred during registration';
        console.error('API Error:', error.response?.data);
        Alert.alert('Registration Failed', errorMsg);
      } else {
        console.error('Unexpected error:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Registration Form</Text>
        
        {/* Full Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={[styles.input, errors.fullName ? styles.inputError : null]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter your full name"
                placeholderTextColor="#999"
                autoCapitalize="words"
              />
            )}
          />
          {errors.fullName ? (
            <Text style={styles.errorText}>{errors.fullName.message}</Text>
          ) : null}
        </View>
        
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          ) : null}
        </View>
        
        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={[styles.input, errors.password ? styles.inputError : null]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry
              />
            )}
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          ) : null}
        </View>
        
        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Confirm your password"
                placeholderTextColor="#999"
                secureTextEntry
              />
            )}
          />
          {errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
          ) : null}
        </View>
        
        {/* Bio / TextArea equivalent */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Bio (optional)</Text>
          <Controller
            control={control}
            name="bio"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                style={[styles.textArea, errors.bio ? styles.inputError : null]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Tell us about yourself"
                placeholderTextColor="#999"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            )}
          />
          <Text style={styles.charCount}>
            {bioValue.length}/250 characters
          </Text>
          {errors.bio ? (
            <Text style={styles.errorText}>{errors.bio.message}</Text>
          ) : null}
        </View>
        
        {/* Profile Image Upload */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Profile Picture</Text>
          <TouchableOpacity 
            style={styles.uploadButton} 
            onPress={pickImage}
          >
            <Text style={styles.uploadButtonText}>
              {profileImage ? 'Change Image' : 'Select Image'}
            </Text>
          </TouchableOpacity>
          
          {profileImage ? (
            <Image 
              source={{ uri: profileImage.uri }} 
              style={styles.previewImage} 
            />
          ) : null}
        </View>
        
        {/* Document Upload */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Resume/CV (PDF or Word)</Text>
          <TouchableOpacity 
            style={styles.uploadButton} 
            onPress={pickDocument}
          >
            <Text style={styles.uploadButtonText}>
              {document ? 'Change Document' : 'Select Document'}
            </Text>
          </TouchableOpacity>
          
          {document ? (
            <View style={styles.documentPreview}>
              <Text numberOfLines={1} ellipsizeMode="middle" style={styles.documentName}>
                {document.name}
              </Text>
              <Text style={styles.documentSize}>
                {(document.size / 1024).toFixed(2)} KB
              </Text>
            </View>
          ) : null}
        </View>
        
        {/* Submit Button */}
        <TouchableOpacity 
          style={[styles.submitButton, isSubmitting ? styles.submitButtonDisabled : null]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Register</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  textArea: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 100,
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 4,
  },
  uploadButton: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#007aff',
    fontSize: 16,
    fontWeight: '500',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 12,
    resizeMode: 'cover',
  },
  documentPreview: {
    backgroundColor: '#eef2ff',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  documentName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  documentSize: {
    fontSize: 12,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    height: 56,
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#82b1ff',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RegisterForm;