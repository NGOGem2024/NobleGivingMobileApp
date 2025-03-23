import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, UIManager, findNodeHandle, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing,
  FadeInRight,
  FadeIn,
  FadeInLeft,
  FadeInDown,
  SlideInLeft,
  SlideInRight,
  SlideInDown
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const MissionSection = () => {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);
  const visibilityCheckInterval = useRef<NodeJS.Timeout | null>(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (visibilityCheckInterval.current) {
        clearInterval(visibilityCheckInterval.current);
      }
    };
  }, []);

  // Reset animation state when component key changes (during refresh)
  useEffect(() => {
    setAnimate(false);
    setIsVisible(false);

    // Start checking visibility at regular intervals
    visibilityCheckInterval.current = setInterval(checkIfVisible, 300);

    return () => {
      if (visibilityCheckInterval.current) {
        clearInterval(visibilityCheckInterval.current);
      }
    };
  }, []);

  // Better visibility detection with threshold
  const checkIfVisible = () => {
    if (componentRef.current) {
      const handle = findNodeHandle(componentRef.current);
      
      if (handle) {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
          // Consider component visible if at least 30% is in viewport
          const viewportHeight = Dimensions.get('window').height;
          const componentVisible = 
            (pageY < viewportHeight && pageY + height * 0.3 > 0) || 
            (pageY + height > 0 && pageY < viewportHeight * 0.7);
          
          if (componentVisible && !isVisible) {
            setIsVisible(true);
            
            // Add delay before starting animations
            setTimeout(() => {
              setAnimate(true);
              
              // Clear the interval once animations have started
              if (visibilityCheckInterval.current) {
                clearInterval(visibilityCheckInterval.current);
              }
            }, 600); // Delay animations by 600ms after becoming visible
          }
        });
      }
    }
  };

  // Shared values for interactive animations
  const imageScale = useSharedValue(1);
  
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: imageScale.value }]
    };
  });

  const handleImagePressIn = () => {
    imageScale.value = withTiming(0.98, { duration: 150, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  };

  const handleImagePressOut = () => {
    imageScale.value = withTiming(1, { duration: 200, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  };
  
  if (!animate) {
    // Return non-animated version initially
    return (
      <View style={styles.container} ref={componentRef}>
        <View style={styles.headerContainer}>
          <Text style={styles.sectionTitle}>
            <Feather name="info" size={18} color="#0ee6b7" /> About Us
          </Text>
          <View style={styles.missionTitleContainer}>
            <Text style={styles.missionTitle}>Our Mission</Text>
            <View style={styles.titleUnderline} />
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop' }} 
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.overlayImage}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop' }} 
                style={styles.secondaryImage}
                resizeMode="cover"
              />
            </View>
          </View>
          
          <View style={styles.textContainer}>
            <View style={styles.missionStatementContainer}>
              <MaterialCommunityIcons name="heart-pulse" size={24} color="#164860" style={styles.iconStyle} />
              <Text style={styles.missionStatement}>
                Noble Giving empowers donors, connects causes, and drives measurable social impact through innovative philanthropy
              </Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.visionContainer}>
              <View style={styles.visionHeaderContainer}>
                <Feather name="eye" size={20} color="#164860" style={styles.iconStyle} />
                <Text style={styles.visionTitle}>Our Vision</Text>
              </View>
              <View style={styles.visionTextContainer}>
                <Text style={styles.visionText}>
                  Empowering a sustainable future by transforming global philanthropy via our universal platform for positive change and lasting impact.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  // Animated version
  return (
    <Animated.View 
      style={styles.container} 
      ref={componentRef}
      entering={FadeInDown.duration(500)}
    >
      <Animated.View 
        style={styles.headerContainer}
        entering={FadeInDown.delay(100).duration(400)}
      >
        <Animated.Text 
          style={styles.sectionTitle}
          entering={FadeInDown.delay(200).duration(400)}
        >
          <Feather name="info" size={18} color="#164860" /> About Us
        </Animated.Text>
        <View style={styles.missionTitleContainer}>
          <Animated.Text 
            style={styles.missionTitle}
            entering={FadeInDown.delay(300).duration(400)}
          >
            Our Mission
          </Animated.Text>
          <Animated.View 
            style={styles.titleUnderline}
            entering={FadeInDown.delay(400).duration(400)}
          />
        </View>
      </Animated.View>
      
      <View style={styles.contentContainer}>
        <Animated.View 
          style={styles.imageContainer}
          entering={FadeInDown.delay(400).duration(400)}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={handleImagePressIn}
            onPressOut={handleImagePressOut}
          >
            <Animated.View style={imageAnimatedStyle}>
              <Animated.Image 
                source={{ uri: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop' }} 
                style={styles.image}
                resizeMode="cover"
                entering={FadeInDown.delay(500).duration(400)}
              />
            </Animated.View>
          </TouchableOpacity>
          
          <Animated.View 
            style={styles.overlayImage}
            entering={FadeInDown.delay(600).duration(400)}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop' }} 
              style={styles.secondaryImage}
              resizeMode="cover"
            />
          </Animated.View>
        </Animated.View>
        
        <Animated.View 
          style={styles.textContainer}
          entering={FadeInDown.delay(500).duration(400)}
        >
          <Animated.View 
            style={styles.missionStatementContainer}
            entering={FadeInDown.delay(600).duration(400)}
          >
            <MaterialCommunityIcons name="heart-pulse" size={24} color="#164860" style={styles.iconStyle} />
            <Animated.Text 
              style={styles.missionStatement}
              entering={FadeInDown.delay(700).duration(400)}
            >
              Noble Giving empowers donors, connects causes, and drives measurable social impact through innovative philanthropy
            </Animated.Text>
          </Animated.View>
          
          <Animated.View 
            style={styles.divider}
            entering={FadeInDown.delay(800).duration(400)}
          />
          
          <Animated.View 
            style={styles.visionContainer}
            entering={FadeInDown.delay(900).duration(400)}
          >
            <Animated.View 
              style={styles.visionHeaderContainer}
              entering={FadeInDown.delay(1000).duration(400)}
            >
              <Feather name="eye" size={20} color="#164860" style={styles.iconStyle} />
              <Animated.Text 
                style={styles.visionTitle}
                entering={FadeInDown.delay(1100).duration(400)}
              >
                Our Vision
              </Animated.Text>
            </Animated.View>
            <Animated.View 
              style={styles.visionTextContainer}
              entering={FadeInDown.delay(1200).duration(400)}
            >
              <Animated.Text 
                style={styles.visionText}
                entering={FadeInDown.delay(1300).duration(400)}
              >
                Empowering a sustainable future by transforming global philanthropy via our universal platform for positive change and lasting impact.
              </Animated.Text>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 24,
    marginHorizontal: 14,
    marginVertical: 10,
    // backgroundColor: 'white',
  },
  headerContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#164860',
    fontWeight: '600',
    marginBottom: 3,
  },
  missionTitleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  missionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#164860',
    marginTop: 6,
  },
  titleUnderline: {
    height: 3,
    width: 120,
    backgroundColor: '#1E88E5',
    marginTop: 6,
    borderRadius: 2,
  },
  contentContainer: {
    flexDirection: 'column',
  },
  imageContainer: {
    position: 'relative',
    height: 190,
    marginBottom: 22,
  },
  image: {
    width: '85%',
    height: 170,
    borderRadius: 18,
  },
  overlayImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 125,
    height: 125,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: 'white',
  },
  secondaryImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginTop: 8,
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
  },
  missionStatementContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  iconStyle: {
    marginRight: 10,
    marginTop: 3,
  },
  missionStatement: {
    flex: 1,
    fontSize: 17,
    lineHeight: 25,
    color: '#444',
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 18,
  },
  visionContainer: {
    paddingTop: 6,
  },
  visionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  visionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#164860',
  },
  visionTextContainer: {
    backgroundColor: '#f2f7fb',
    padding: 18,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#1E88E5',
  },
  visionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    fontWeight: '400',
  },
});

export default MissionSection; 