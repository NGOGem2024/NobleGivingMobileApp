import React from 'react';
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

const Stack = createStackNavigator();

// Wrapper component for OTP verification
const OtpVerificationWrapper = ({ navigation, route }: any) => (
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
          name="NGODetailScreen"
          component={NGODetailScreen}
          options={{ headerShown: false }}
        />
        {/* Keep the SamarthyaNGO screen for backward compatibility */}
        <Stack.Screen
          name="SamarthyaNGO"
          component={NGODetailScreen}
          options={{ headerShown: false }}
          initialParams={{ ngoId: "66c47659f618b819aabe91b4" }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;