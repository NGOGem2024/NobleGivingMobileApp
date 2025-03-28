// SignupScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import api from '../services/apiClient';
import { EndPoint } from '../services/apiServices';



interface SignupFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^\+?[0-9]{10,14}$/, 'Invalid phone number')
    .required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

const SignupScreen: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const initialValues: SignupFormValues = {
    name: '',
    email: '',
    phone: '+91',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  };

  // Helper function to get detailed error message
  const getErrorMessage = (error: any): string => {
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      return error.response.data?.message ||
             `Server error: ${error.response.status} ${error.response.statusText}`;
    } else if (error.request) {
      // Request was made but no response received
      if (error.code === 'ECONNABORTED') {
        return 'Request timed out. Please check your internet connection and try again.';
      }
      return 'Unable to connect to server. Please check your internet connection and try again.';
    } else {
      // Something else happened while setting up the request
      return 'An unexpected error occurred. Please try again.';
    }
  };

  const handleSignup = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      console.log('Attempting signup with:', {
        name: values.name,
        email: values.email,
        phone: values.phone,
      });
      // Create axios instance with timeout
      const response = await api.post(EndPoint.signUp, {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      });
      console.log('Signup successful:', response.data);
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('Login' as never);
    } catch (error) {
      console.error('Signup error:', error);
      // Log detailed error information
      if (axios.isAxiosError(error)) {
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          request: error.request ? 'Present' : 'Absent',
          response: error.response ? {
            status: error.response.status,
            data: error.response.data,
          } : 'Absent',
        });
      }
      const errorMessage = getErrorMessage(error);
      Alert.alert('Signup Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/fullnamelogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Sign up now to start making donations</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#164860" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
              </View>
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <View style={styles.inputContainer}>
                <Icon name="mail" size={20} color="#164860" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  autoCapitalize="none"
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCodeContainer}>
                  {/* <Image
                    source={require('../assets/india-flag.png')}
                    style={styles.flagIcon}
                  /> */}
                  <Text style={styles.countryCode}>+91</Text>
                  <Icon name="chevron-down" size={16} color="#164860" />
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  value={values.phone.replace('+91', '')}
                  onChangeText={(text) => setFieldValue('phone', `+91${text}`)}
                  onBlur={handleBlur('phone')}
                />
              </View>
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}

              <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#164860" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#164860" />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#164860" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirmPassword}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={20}
                    color="#164860"
                  />
                </TouchableOpacity>
              </View>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <View style={styles.termsContainer}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setFieldValue('agreeToTerms', !values.agreeToTerms)}
                >
                  {values.agreeToTerms && <Icon name="check" size={16} color="#164860" />}
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  By Signing up, you agree to the{' '}
                  <Text style={styles.termsLink}>terms and conditions</Text>.
                </Text>
              </View>
              {touched.agreeToTerms && errors.agreeToTerms && (
                <Text style={styles.errorText}>{errors.agreeToTerms}</Text>
              )}

              <TouchableOpacity
                style={styles.createButton}
                onPress={() => handleSubmit()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.createButtonText}>Create Account</Text>
                )}
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login'as never)}>
                  <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 320,
    height: 220,
    marginBottom: -30,
    marginTop: -40,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#164860',
    marginTop: -10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#164860',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#164860',
    marginBottom: 24,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 56,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    height: 56,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    height: '100%',
  },
  flagIcon: {
    width: 24,
    height: 18,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#164860',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#164860',
  },
  termsLink: {
    color: '#164860',
    textDecorationLine: 'underline',
  },
  createButton: {
    backgroundColor: '#164860',
    borderRadius: 8,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 16,
    color: '#164860',
  },
  loginLink: {
    fontSize: 16,
    color: '#164860',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginTop: -4,
  },
});

export default SignupScreen;
