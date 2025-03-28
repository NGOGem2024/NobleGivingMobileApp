import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import OtpVerification from './screens/OtpVerification';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import BottomTabs from './components/BottomTabs';
import NGODetailScreen from './components/NGODetailScreen';
import MapScreen from './screens/MapScreen';
import BasketScreen from './screens/BasketScreen';
import NGOScreen from './screens/NGOScreen';
import SelectScreen from './screens/SelectScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
import OnboardingSlider from './components/OnboardingSlider';
import NGORegistration from './screens/NGO/NGORegistration';
import NGOWelcomeScreen from './screens/NGO/NGOWelcomeScreen';
import NGOLogin from './screens/NGO/NGOLogin';
import NgoOTPVerification from './screens/NGO/NgoOTPVerification';

const Stack = createStackNavigator();

// Wrapper component for OTP verification
const OtpVerificationWrapper = ({ navigation, route }: { navigation: any; route: any }) => (

  <OtpVerification
    navigation={navigation}
    route={route}
    onVerificationSuccess={() => navigation.navigate('Home')}
    onBackPress={() => navigation.goBack()}
  />
);


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }}
        />
           <Stack.Screen 
          name="Onboarding" 
          options={{ headerShown: false }}
        >
          {(props) => (
            <OnboardingSlider 
              {...props} 
              onFinish={() => {
                // Save that user has seen onboarding
                AsyncStorage.setItem('hasSeenOnboarding', 'true')
                  .then(() => {
                    // Navigate to Select screen
                    props.navigation.replace('Select');
                  })
                  .catch(error => {
                    console.log('Error saving onboarding status:', error);
                    props.navigation.replace('Select');
                  });
              }} 
            />
          )}
        </Stack.Screen>
          <Stack.Screen
          name="Select"
          component={SelectScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="verifyOTP"
          component={OtpVerificationWrapper}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ResetPassword" 
          component={ResetPasswordScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Home"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NGOScreen"
          component={NGOScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NGODetailScreen"
          component={NGODetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BasketScreen"
          component={BasketScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />


        {/* NGO screen started here */}
        <Stack.Screen
          name="NGOWelcome"
          component={NGOWelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NGORegistration"
          component={NGORegistration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NGOLogin"
          component={NGOLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NgoOTPVerification"
          component={NgoOTPVerification}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;