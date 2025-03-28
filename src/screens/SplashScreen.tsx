// import React, { useEffect, useCallback, useRef } from 'react';
// import { View, StyleSheet, Image, Animated } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type RootStackParamList = {
//   Splash: undefined;
//   Welcome: undefined;
//   Home: undefined;
//   Select: undefined
//   // Ensure Home is part of your navigation stack
// };

// type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

// interface Props {
//   navigation: SplashScreenNavigationProp;
// }

// const SplashScreen: React.FC<Props> = ({ navigation }) => {
//   const logoFade = useRef(new Animated.Value(0)).current;
//   const textFade = useRef(new Animated.Value(0)).current;
//   const logoScale = useRef(new Animated.Value(0.8)).current;

//   const checkUserLogin = useCallback(async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       if (token) {
//         navigation.replace('Home'); // If token exists, go to Home
//       } else {
//         navigation.replace('Select'); // Otherwise, go to Welcome
//       }
//     } catch (error) {
//       console.error('Error checking token:', error);
//       navigation.replace('Select'); // Fallback to Welcome
//     }
//   }, [navigation]);

//   useEffect(() => {
//     let isMounted = true;

//     // Sequence of animations
//     Animated.sequence([
//       // First fade in and scale up the logo
//       Animated.parallel([
//         Animated.timing(logoFade, {
//           toValue: 1,
//           duration: 800,
//           useNativeDriver: true,
//         }),
//         Animated.timing(logoScale, {
//           toValue: 1,
//           duration: 800,
//           useNativeDriver: true,
//         }),
//       ]),
//       // Then fade in the text
//       Animated.timing(textFade, {
//         toValue: 1,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     const timer = setTimeout(() => {
//       if (isMounted) checkUserLogin();
//     }, 2300); // Increased slightly to allow for the full animation sequence

//     return () => {
//       isMounted = false;
//       clearTimeout(timer);
//     };
//   }, [logoFade, textFade, logoScale, checkUserLogin]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.contentContainer}>
//         <Animated.View 
//           style={[
//             styles.logoContainer, 
//             { 
//               opacity: logoFade,
//               transform: [{ scale: logoScale }]
//             }
//           ]}
//         >
//           <Image source={require('../assets/logo-edit.png')} style={styles.logo} />
//         </Animated.View>
        
//         <Animated.View style={[styles.textContainer, { opacity: textFade }]}>
//           <Image source={require('../assets/Soft-White-text.png')} style={styles.textLogo} />
//         </Animated.View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#164860',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 26,
//   },
//   logo: {
//     width: 90,
//     height: 90,
//   },
//   textContainer: {
//     alignItems: 'center',
//   },
//   textLogo: {
//     width: 245,
//     height: 45,
//     resizeMode: 'contain',
//   },
// });


import React, { useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Home: undefined;
  Select: undefined;
  Onboarding: undefined;
  // Ensure Home is part of your navigation stack
};

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const logoFade = useRef(new Animated.Value(0)).current;
  const textFade = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  const checkUserLogin = useCallback(async () => {
    try {
      // First check if the user has seen onboarding
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      
      // If user hasn't seen onboarding, show that first
      if (hasSeenOnboarding !== 'true') {
        navigation.replace('Onboarding');
        return;
      }
      
      // If user has seen onboarding, check for login token
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        navigation.replace('Home'); // If token exists, go to Home
      } else {
        navigation.replace('Select'); // Otherwise, go to Select
      }
    } catch (error) {
      console.error('Error checking token:', error);
      navigation.replace('Select'); // Fallback to Select
    }
  }, [navigation]);

  useEffect(() => {
    let isMounted = true;

    // Sequence of animations
    Animated.sequence([
      // First fade in and scale up the logo
      Animated.parallel([
        Animated.timing(logoFade, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Then fade in the text
      Animated.timing(textFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      if (isMounted) checkUserLogin();
    }, 2300); // Increased slightly to allow for the full animation sequence

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [logoFade, textFade, logoScale, checkUserLogin]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Animated.View 
          style={[
            styles.logoContainer, 
            { 
              opacity: logoFade,
              transform: [{ scale: logoScale }]
            }
          ]}
        >
          <Image source={require('../assets/logo-edit.png')} style={styles.logo} />
        </Animated.View>
        
        <Animated.View style={[styles.textContainer, { opacity: textFade }]}>
          <Image source={require('../assets/Soft-White-text.png')} style={styles.textLogo} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#164860',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 26,
  },
  logo: {
    width: 90,
    height: 90,
  },
  textContainer: {
    alignItems: 'center',
  },
  textLogo: {
    width: 245,
    height: 45,
    resizeMode: 'contain',
  },
});
