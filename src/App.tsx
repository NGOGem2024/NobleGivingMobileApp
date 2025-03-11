// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SplashScreen from './screens/SplashScreen';
// import HomeScreen from './screens/HomeScreen'; // Your main app screen
// import WelcomeScreen from './screens/WelcomeScreen';
// import LoginScreen from './screens/LoginScreen';
// import SignupScreen from './screens/SignupScreen';
// import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
// import OtpVerification from './screens/OtpVerification';
// import ResetPasswordScreen from './screens/ResetPasswordScreen'

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//         <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
//         <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
//         <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
//         <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}} />
//         <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown: false}} />
//         {/* <Stack.Screen name="verifyOTP" component={OtpVerification} options={{headerShown: false}} /> */}
//           <Stack.Screen
//             name="verifyOTP"
//             options={{ headerShown: false }}
//           >
//             {props => <OtpVerification {...props} onVerificationSuccess={() => props.navigation.navigate('Home')} onBackPress={() => props.navigation.goBack()} />}
//           </Stack.Screen>
//           <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />


//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
// export default App;

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { View, Text } from 'react-native';
// import SplashScreen from './screens/SplashScreen';
// import HomeScreen from './screens/HomeScreen';
// import WelcomeScreen from './screens/WelcomeScreen';
// import LoginScreen from './screens/LoginScreen';
// import SignupScreen from './screens/SignupScreen';
// import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
// import OtpVerification from './screens/OtpVerification';
// import ResetPasswordScreen from './screens/ResetPasswordScreen';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Placeholder components for other tabs
// const ProfileScreen = () => (<View><Text>Profile</Text></View>);
// const SettingsScreen = () => (<View><Text>Settings</Text></View>);
// const NotificationsScreen = () => (<View><Text>Notifications</Text></View>);

// const BottomTabs = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//       <Tab.Screen name="Notifications" component={NotificationsScreen} />
//     </Tab.Navigator>
//   );
// };

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//         <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
//         <Stack.Screen name="Welcome" component={WelcomeScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Signup" component={SignupScreen} />
//         <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//         <Stack.Screen name="OtpVerification" component={OtpVerification as React.FC<any>} />
//         <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { View, Text } from 'react-native';
// import { createIconSetFromFontello } from 'react-native-vector-icons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import SplashScreen from './screens/SplashScreen';
// import HomeScreen from './screens/HomeScreen';
// import WelcomeScreen from './screens/WelcomeScreen';
// import LoginScreen from './screens/LoginScreen';
// import SignupScreen from './screens/SignupScreen';
// import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
// import OtpVerification from './screens/OtpVerification';
// import ResetPasswordScreen from './screens/ResetPasswordScreen';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Placeholder components for other tabs
// const ProfileScreen = () => (<View><Text>Find Ngo</Text></View>);
// const SettingsScreen = () => (<View><Text>Settings</Text></View>);
// const NotificationsScreen = () => (<View><Text>Notifications</Text></View>);

// const BottomTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName = 'home-outline'; // Default icon
        
//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Find Ngo') {
//             iconName = focused ? 'people' : 'people-outline';
//           } else if (route.name === 'Settings') {
//             iconName = focused ? 'settings' : 'settings-outline';
//           } else if (route.name === 'Notifications') {
//             iconName = focused ? 'notifications' : 'notifications-outline';
//           }
        
//           return <Ionicons name={iconName} size={29} color={color} />;
//         },
//         tabBarActiveTintColor: '#164860',
//         tabBarInactiveTintColor: '#164860',
//         tabBarStyle: { backgroundColor: '#fff', paddingBottom: 5 },
//         headerShown: false, // ✅ Hides header on all tabs
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Find Ngo" component={ProfileScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//       <Tab.Screen name="Notifications" component={NotificationsScreen} />
//     </Tab.Navigator>
//   );
// };


// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash">
//         <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
//         <Stack.Screen name="Welcome" component={WelcomeScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Signup" component={SignupScreen} />
//         <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//         <Stack.Screen name="OtpVerification" component={OtpVerification as React.FC<any>} />
//         <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;