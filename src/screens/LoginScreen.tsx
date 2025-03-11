import React, { useEffect, useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, ActivityIndicator, TouchableOpacity, View,Alert,ScrollView,ImageBackground } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik} from 'formik';
import FormInput from '../components/FormInput';
import ErrorMessage from '../components/ErrorMessage';
import * as Yup from 'yup';
import { CommonActions, useNavigation } from '@react-navigation/native';
import api from '../services/apiClient';
import { EndPoint } from '../services/apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Login:undefined;
  SignUp:undefined;
  Home:undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList,'Login'>;

interface LoginScreenProps{
  navigation:LoginScreenNavigationProp;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
  .label('Email')
  .email('Enter a valid email address')
  .required('Please enter a registered email'),
  password: Yup.string()
      .label('Password')
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
})

const LoginScreen:React.FC<LoginScreenProps> = ({navigation}) => {
  // const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  // const navigation = useNavigation();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(EndPoint.login, { email, password, rememberMe });

      console.log('Login Successful:', response.data);

      const token = response.data.user.token;
      console.log('body', response);
      await AsyncStorage.setItem('userToken', token);

      // Navigate to Home screen after successful login
      navigation.navigate('Home' as never);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }], // Replace 'Home' with your target screen
        })
      );

    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Error', 'Invalid email or password');
      setLoading(false);
    }finally {
      setLoading(false);
    }
  };

        return (
          <KeyboardAvoidingView
          behavior="height" // 👈 'height' ensures input fields are not pushed up
          style={styles.container}
          >
          <ImageBackground 
            source={require('../assets/bg-1.png')}
            style={styles.backgroundImage}
          >
                <ScrollView
                  contentContainerStyle={styles.scrollViewContent}
                     keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
          <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.contentContainer}
            >
              <View style={styles.logoContainer}>
              <Image
                        source={require('../assets/Soft-White.png')} // Replace with your splash logo
                        style={styles.logo}
                      />
              </View>
              <Text style={styles.welcomeText}>Welcome back!</Text>

            {/* Formik Validation Starts */}

          <Formik
            initialValues={{ email: '' , password: ''}}
            onSubmit={(values) => handleLogin(values.email, values.password)}
            validationSchema={validationSchema} 
           >
            {({ handleChange, handleBlur, handleSubmit, values,errors,isValid }) => (
              <View>
                <FormInput
                      name="email"
                      placeholder="Email"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                />
                <ErrorMessage errorValue={errors.email} />
                    <FormInput
                        name="password"
                        placeholder="Password"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry/>
                        <ErrorMessage errorValue={errors.password} />
                <View style={styles.rememberContainer}>
                          <BouncyCheckbox
                          style={styles.checkbox}
                          useBuiltInState
                            isChecked={rememberMe}
                            onPress={() => setRememberMe(!rememberMe)}
                            fillColor="#164860"
                            innerIconStyle={{borderRadius: 5}}
                            iconStyle={{borderRadius: 5}} 
                          />
                          <Text style={styles.rememberText}>Remember me</Text>

                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
                          <Text style={[styles.forgotPassword,styles.termsLink]}>Forgot password?</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        style={[styles.button, styles.createAccountButton]}
                        onPress={()=> handleSubmit()}
                        // disabled={!isValid}
                      >
                      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonTextWhite} >Login</Text>}
                      </TouchableOpacity>
              </View>
            )}
          </Formik>
        {/* Formik Validation Finishes */}
              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>New user? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup' as never)}>
                  <Text style={[styles.signUpLink,styles.termsLink]}>Sign Up</Text>
                </TouchableOpacity>
              </View>
                <TouchableOpacity style={[styles.signInButton,styles.gloginbutton]}>
                  <View style={styles.signInContent}>
                      <Image
                        source={require('../assets/google-color.png')}
                        style={styles.Glogo}
                      />
                      <Text style={styles.buttonTextBlack}>Sign in with another account</Text>
                    </View>
                  </TouchableOpacity>
            </KeyboardAvoidingView>
          </SafeAreaView>
          </ScrollView>
          </ImageBackground>
          </KeyboardAvoidingView>

        );
      };
    export default LoginScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex:1,
    backgroundColor:'transparent',
    justifyContent:'center',
  },
  contentContainer: {
    flex: 1,
    padding: 23,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 28,
    zIndex:1
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#164860',
  },
  Glogo: {
    width: 35,
    height: 35,
    marginRight:10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 43,
    textAlign: 'center',
    color:'#164860'
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  logo: {
    width: 280,
    height: 170,
    marginBottom: 95,
  },
  button: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  createAccountButton: {
    backgroundColor: '#164860',
  },
  loginButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#6c63ff',
  },
  buttonTextWhite: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonTextPurple: {
    color: '#164860',
    fontWeight: 'bold',
  },

  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    // borderWidth: 1,
    // borderColor: '#164860',
    borderRadius: 0,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    color: '#164860',
    flex: 1,
  },
  forgotPassword: {
    color: '#164860',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#666',
  },
  signUpLink: {
    color: '#164860',
    fontWeight: 'bold',
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 11,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 23,
  },
  gloginbutton:{
    borderWidth: 0.5,
    borderColor: '#000000',
  },
  signInContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonTextBlack: {
    color: '#000000',
    fontWeight: 'bold',
  },
  termsLink: {
    color: '#164860',
    textDecorationLine: 'underline',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})




