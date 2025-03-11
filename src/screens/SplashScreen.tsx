import React, { useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Home: undefined; // Ensure Home is part of your navigation stack
};

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Start opacity at 0

  const checkUserLogin = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        navigation.replace('Home'); // If token exists, go to Home
      } else {
        navigation.replace('Welcome'); // Otherwise, go to Welcome
      }
    } catch (error) {
      console.error('Error checking token:', error);
      navigation.replace('Welcome'); // Fallback to Welcome
    }
  }, [navigation]);

  useEffect(() => {
    let isMounted = true;

    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1, // Fade to full opacity
      duration: 1000, // 1 second duration
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      if (isMounted) checkUserLogin();
    }, 1300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [fadeAnim, checkUserLogin]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </Animated.View>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
});
