import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions, 
  StatusBar 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring 
} from 'react-native-reanimated';
import { StackNavigationProp } from '@react-navigation/stack';
// import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');
type SelectScreenNavigationProp = StackNavigationProp<any>;

interface SelectScreenProps {
  navigation: SelectScreenNavigationProp;
}

const SelectScreen: React.FC<SelectScreenProps> = ({ navigation }) => {
  // Animation values
  const fadeIn = useSharedValue(0);   // Controls the opacity
  const scale = useSharedValue(0.5);  // Controls the size of the image
  const slideUp = useSharedValue(100);// Controls the bottom container movement

  // Animated styles
  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: fadeIn.value,
  }));

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const slideUpStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideUp.value }],
  }));

  // Run animations when the component mounts
  useEffect(() => {
    fadeIn.value = withTiming(1, { duration: 1000 });
    scale.value = withSpring(1, { damping: 8, stiffness: 100 });
    slideUp.value = withTiming(0, { duration: 800 });
  }, [fadeIn, scale, slideUp]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Background gradient */}
      <StatusBar backgroundColor="#164860" barStyle="light-content" />
      <LinearGradient colors={['#164860', '#164860']} style={styles.background} />
      
      {/* Top circular shape with animation */}
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle, scaleStyle]}>
          <Image
            source={require('../assets/help.jpg')}
            style={styles.illustration}
            resizeMode="contain"
          />
          {/* <LottieView source={require('../assets/animations/select.json')} style={styles.illustration} resizeMode="cover" autoPlay loop/> */}
        </Animated.View>
      </View>

      {/* Bottom content with slide-up effect */}
      <Animated.View style={[styles.bottomContainer, slideUpStyle]}>
        <Animated.Text style={[styles.headerText, fadeInStyle]}>
          Select an option to start
        </Animated.Text>

        {/* Buttons with fade-in effect */}
        <Animated.View style={fadeInStyle}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('NGOWelcome')}
          >
            <Text style={styles.buttonText}>Start a fundraiser</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Welcome')}
          >
            <Text style={styles.buttonText}>Make a donation</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Sign-in link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signInLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
  },
  circleContainer: {
    height: height * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.45,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  illustration: {
    width: width * 0.7,
    height: width * 0.7,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    marginTop: -30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#164860',
    borderRadius: 50,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInText: {
    fontSize: 16,
    color: '#333',
  },
  signInLink: {
    fontSize: 16,
    color: '#164860',
    fontWeight: '500',
  },
});

export default SelectScreen;
