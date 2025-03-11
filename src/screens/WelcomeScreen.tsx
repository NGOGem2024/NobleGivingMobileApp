import React, { useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';

// Define the type for navigation
type WelcomeScreenNavigationProp = StackNavigationProp<any>;

interface WelcomeScreenProps {
  navigation:WelcomeScreenNavigationProp;
}

GoogleSignin.configure({
  webClientId: '403939934809-uausboea2etnopvci0l6hohvcqtp2l2e.apps.googleusercontent.com', // Found in Google Cloud Console
  offlineAccess: true, // Get refresh token
  forceCodeForRefreshToken: true, // Only works if you added webClientId
});


const WelcomeScreen:React.FC<WelcomeScreenProps> = ({navigation}) => {

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
      if (!userInfo.idToken) {
        throw new Error("No ID Token found in Google Sign-In response");
      }
      const idToken = userInfo.idToken; // ✅ Extract idToken properly
      await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      // Send token to backend
      const response = await axios.post('https://noblegivingbackend.azurewebsites.net/auth/google', { idToken });
      console.log('Backend Response:', response.data);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

        return (
          <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
              <View style={styles.logoContainer}>
                 <Image
                        source={require('../assets/fullnamelogo.png')} // Replace with your splash logo
                        style={styles.logo}
                      />
              </View>
              <Text style={styles.welcomeText}>Welcome!</Text>

              <TouchableOpacity 
                style={[styles.button, styles.createAccountButton]}
                onPress={() => navigation.navigate('Signup')}
              >
                <Text style={styles.buttonTextWhite}
                >Create Account</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.button, styles.loginButton]}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.buttonTextPurple}>Login</Text>
              </TouchableOpacity>

              {/* OR separator */}
              <View style={styles.orContainer}>
                <View style={styles.orLine} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.orLine} />
              </View>

            <TouchableOpacity 
            style={[styles.signInButton,styles.gloginbutton]}
            onPress={signInWithGoogle}
            >
              <View style={styles.signInContent}>
                <Image 
                  source={require('../assets/google-color.png')}
                  style={styles.Glogo}
                />
                <Text style={styles.buttonTextBlack}>Sign in with another account</Text>
              </View>
            </TouchableOpacity>

                {/*  */}
            </View>
          </SafeAreaView>
        );
      };

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      contentContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
      },
      logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
      },
      logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6c63ff',
      },
      logo: {
        width: 350,
        height: 250,
        marginBottom: 20,
      },
      Glogo: {
        width: 24,
        height: 24,
        marginRight: 10, // Creates spacing between the logo and text
      },
      welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
      },
      input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
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
        borderColor: '#164860',
      },
      buttonTextWhite: {
        color: '#fff',
        fontWeight: 'bold',
      },
      buttonTextBlack: {
        color: '#000000',
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
      socialButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        marginHorizontal:10,
        justifyContent: 'center',
        alignItems: 'center',
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
        borderWidth: 1,
        borderColor: '#6c63ff',
        borderRadius: 4,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      rememberText: {
        color: '#666',
        flex: 1,
      },
      forgotPassword: {
        color: '#6c63ff',
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
        color: '#6c63ff',
        fontWeight: 'bold',
      },

      signInButton: {
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: "#ffffff",
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 23,   
      },     
      signInContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 13, // Space between buttons
      },
      
      orLine: {
        flex: 1,
        height: 1.2,
        backgroundColor: '#ccc',
        marginHorizontal: 15,
      },
      
      orText: {
        color: '#666',
        fontWeight: 'bold',
      },
      gloginbutton:{
        borderWidth: 0.5,
        borderColor: '#000000'
      }
});






