// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Feather';
// import HomeScreen from '../screens/HomeScreen';
// import NGOScreen from '../screens/NGOScreen';
// import CampaignsScreen from '../screens/CampaignsScreen';
// import UserProfileScreen from '../screens/UserProfileScreen';

// const Tab = createBottomTabNavigator();

// const BottomTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: '#164860',
//         tabBarInactiveTintColor: '#999999',
//         tabBarStyle: {
//           height: 60,
//           paddingBottom: 8,
//           paddingTop: 8,
//         },
//         headerShown: false,
//       }}
//     >
//       <Tab.Screen
//         name="HomeTab"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="home" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="NGO"
//         component={NGOScreen}
//         options={{
//           tabBarLabel: 'NGOs',
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="users" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Campaigns"
//         component={CampaignsScreen}
//         options={{
//           tabBarLabel: 'Campaigns',
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="heart" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={UserProfileScreen}
//         options={{
//           tabBarLabel: 'Profile',
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="user" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default BottomTabs; 

// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { View, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import HomeScreen from '../screens/HomeScreen';
// import NGOScreen from '../screens/NGOScreen';
// import CampaignsScreen from '../screens/CampaignsScreen';
// import UserProfileScreen from '../screens/UserProfileScreen';

// const Tab = createBottomTabNavigator();

// const BottomTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: '#164860',
//         tabBarInactiveTintColor: '#999999',
//         tabBarStyle: styles.tabBar,
//         headerShown: false,
//       }}
//     >
//       <Tab.Screen
//         name="HomeTab"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="home" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="NGO"
//         component={NGOScreen}
//         options={{
//           tabBarLabel: 'NGOs',
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="users" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Campaigns"
//         component={CampaignsScreen}
//         options={{
//           tabBarLabel: 'Campaigns',
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="heart" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={UserProfileScreen}
//         options={{
//           tabBarLabel: 'Profile',
//           tabBarIcon: ({ color, size }) => (
//             <Icon name="user" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     height: 70,
//     paddingBottom: 10,
//     paddingTop: 10,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#ffffff',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: -3 },
//     shadowRadius: 10,
//     elevation: 5,
//   },
// });

// export default BottomTabs;


import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';
import NGOScreen from '../screens/NGOScreen';
import CampaignsScreen from '../screens/CampaignsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#164860',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: styles.tabBar,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Icon name="home" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NGO"
        component={NGOScreen}
        options={{
          tabBarLabel: 'NGOs',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Icon name="users" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Campaigns"
        component={CampaignsScreen}
        options={{
          tabBarLabel: 'Campaigns',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Icon name="heart" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.iconContainer}>
              <Icon name="user" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 62,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 10,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
});

export default BottomTabs;
