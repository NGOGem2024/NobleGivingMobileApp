import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator, PanResponder, Animated, Image, AccessibilityInfo, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

// Define multiple hero items for carousel functionality
const heroItems = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop',
    tagline: 'A Platform For Shared Impact',
    title: 'Building Better\nCommunities',
    description: 'Noble Giving is more than just a platform, it\'s a community of businesses and nonprofits working together to drive positive change.'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2000&auto=format&fit=crop',
    tagline: '',
    title: 'Healing Hearts\nChanging Lives',
    description: 'Your donation mends hearts, restores hope, and creates lasting change for those in need.'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1560252829-804f1aedf1be?q=80&w=2000&auto=format&fit=crop',
    tagline: '',
    title: 'Giving Hope to those In Need',
    description: 'Your donation helps children and families facing tough challenges build a brighter future.'
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [nextIndex, setNextIndex] = useState(0);
  const [gestureX, setGestureX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [autoSlideEnabled, setAutoSlideEnabled] = useState(true);
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<{[key: string]: boolean}>({});
  const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  // Animation values
  const pan = useRef(new Animated.ValueXY()).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Update nextIndex whenever currentIndex changes
  useEffect(() => {
    setNextIndex((currentIndex + 1) % heroItems.length);
  }, [currentIndex]);
  
  // Reset position when changing slides
  useEffect(() => {
    pan.setValue({ x: 0, y: 0 });
    setGestureX(0);
  }, [currentIndex]);
  
  // Add listener for pan.x
  useEffect(() => {
    const panXListener = pan.x.addListener(({value}) => setGestureX(value));
    return () => {
      pan.x.removeListener(panXListener);
    };
  }, []);

  // Check for screen reader
  useEffect(() => {
    const checkScreenReader = async () => {
      const isEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      setIsScreenReaderEnabled(isEnabled);
      // If screen reader is enabled, disable auto-slide
      if (isEnabled) {
        setAutoSlideEnabled(false);
      }
    };
    checkScreenReader();
    
    // Listen for screen reader changes
    const subscription = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      (isEnabled) => {
        setIsScreenReaderEnabled(isEnabled);
        setAutoSlideEnabled(!isEnabled);
      }
    );
    
    return () => {
      subscription.remove();
    };
  }, []);
  
  // Preload next slide image
  useEffect(() => {
    const preloadNextImage = () => {
      const nextItem = heroItems[nextIndex];
      if (nextItem && !preloadedImages[nextItem.id]) {
        Image.prefetch(nextItem.image)
          .then(() => {
            setPreloadedImages(prev => ({
              ...prev,
              [nextItem.id]: true
            }));
          })
          .catch(err => {
            console.warn('Image preloading failed:', err);
          });
      }
    };
    
    preloadNextImage();
  }, [nextIndex, preloadedImages]);
  
  // Auto-slide functionality
  useEffect(() => {
    const startAutoSlide = () => {
      if (autoSlideEnabled && !isScreenReaderEnabled) {
        autoSlideTimerRef.current = setTimeout(() => {
          if (!isTransitioning) {
            handleNextSlide();
          }
        }, 3700); // Change slide every 3.7 seconds
      }
    };
    
    // Clear any existing timer and start a new one
    if (autoSlideTimerRef.current) {
      clearTimeout(autoSlideTimerRef.current);
    }
    
    startAutoSlide();
    
    // Cleanup function to clear timer when component unmounts or dependencies change
    return () => {
      if (autoSlideTimerRef.current) {
        clearTimeout(autoSlideTimerRef.current);
      }
    };
  }, [currentIndex, isTransitioning, autoSlideEnabled, isScreenReaderEnabled]);
  
  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    // Temporarily pause auto-slide during manual transition
    if (autoSlideTimerRef.current) {
      clearTimeout(autoSlideTimerRef.current);
    }
    
    // Enhanced animations for slide transition
    Animated.parallel([
      Animated.timing(pan, {
        toValue: { x: -width, y: 0 },
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      // Change slide
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroItems.length);
      setIsImageLoading(true);
      pan.setValue({ x: 0, y: 0 });
      
      // Reset and animate back in
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          })
        ]).start(() => {
          setIsTransitioning(false);
        });
      }, 100);
    });
  };
  
  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    // Temporarily pause auto-slide during manual transition
    if (autoSlideTimerRef.current) {
      clearTimeout(autoSlideTimerRef.current);
    }
    
    // Enhanced animations for slide transition
    Animated.parallel([
      Animated.timing(pan, {
        toValue: { x: width, y: 0 },
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0.7,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      // Change slide
      setCurrentIndex((prevIndex) => (prevIndex - 1 + heroItems.length) % heroItems.length);
      setIsImageLoading(true);
      pan.setValue({ x: 0, y: 0 });
      
      // Reset and animate back in
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          })
        ]).start(() => {
          setIsTransitioning(false);
        });
      }, 100);
    });
  };
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isTransitioning && !isScreenReaderEnabled,
      onPanResponderGrant: () => {
        // Pause auto-slide when user interacts with the carousel
        setAutoSlideEnabled(false);
        if (autoSlideTimerRef.current) {
          clearTimeout(autoSlideTimerRef.current);
        }
        
        // Add slight press feedback
        Animated.timing(scaleAnim, {
          toValue: 0.98,
          duration: 100,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderMove: (e, gesture) => {
        // Limit the drag to prevent going too far
        if (gesture.dx > -width && gesture.dx < width) {
          Animated.event([null, { dx: pan.x }], { useNativeDriver: false })(e, gesture);
          setGestureX(gesture.dx);
          
          // Adjust opacity based on drag distance for feedback
          const newOpacity = 1 - (Math.abs(gesture.dx) / (width * 2));
          fadeAnim.setValue(Math.max(0.7, newOpacity));
        }
      },
      onPanResponderRelease: (e, gesture) => {
        if (isTransitioning) return;
        
        // Re-enable auto-slide after interaction
        setAutoSlideEnabled(true);
        
        // Return scale to normal
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
        
        // Threshold for swipe action
        if (gesture.dx < -100) {  // Swipe left - next slide
          handleNextSlide();
        } else if (gesture.dx > 100) {  // Swipe right - previous slide
          handlePrevSlide();
        } else {
          // Not enough movement, spring back to original position with fade in
          Animated.parallel([
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              friction: 7,
              tension: 40,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 250,
              useNativeDriver: true,
            })
          ]).start();
        }
      }
    })
  ).current;

  const currentItem = heroItems[currentIndex];
  
  // Carousel indicators as a memoized component
  const CarouselIndicators = useMemo(() => {
    return (
      <View style={styles.indicatorContainer}>
        {heroItems.map((item, index) => (
          <TouchableOpacity 
            key={item.id}
            accessibilityRole="button"
            accessibilityLabel={`Go to slide ${index + 1} of ${heroItems.length}`}
            accessibilityHint={`Shows ${item.tagline}`}
            onPress={() => {
              if (index > currentIndex) {
                handleNextSlide();
              } else if (index < currentIndex) {
                handlePrevSlide();
              }
            }}
          >
            <View 
              style={[
                styles.indicator, 
                currentIndex === index && styles.activeIndicator
              ]} 
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  }, [currentIndex]);

  // Dynamic gradient colors based on dark/light mode
  const gradientColors = isDarkMode 
    ? ['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.75)'] 
    : ['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.7)'];

  return (
    <View 
      style={styles.heroWrapper}
      accessibilityRole="none"
      accessibilityLabel="Hero slideshow"
    >
      <View style={styles.backgroundLayer} />
      <Animated.View 
        style={[
          styles.slideContainer,
          { 
            transform: [
              { translateX: pan.x },
              { scale: scaleAnim }
            ],
            opacity: fadeAnim
          }
        ]}
        {...(isScreenReaderEnabled ? {} : panResponder.panHandlers)}
      >
        <ImageBackground
          source={{ uri: currentItem.image }}
          style={styles.container}
          resizeMode="cover"
          onLoadStart={() => setIsImageLoading(true)}
          onLoadEnd={() => setIsImageLoading(false)}
          accessibilityRole="image"
          accessibilityLabel={`Hero image: ${currentItem.title}`}
        >
          <LinearGradient
            colors={gradientColors}
            style={styles.overlay}
          >
            {isImageLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0ee6b7" />
              </View>
            )}
            
            <View style={styles.contentWrapper}>
              <Text 
                style={styles.tagline}
                accessibilityRole="text"
              >
                {currentItem.tagline}
              </Text>
              
              <Text 
                style={styles.title}
                accessibilityRole="header"
              >
                {currentItem.title}
              </Text>
              
              <Text style={styles.subtitle}>by</Text>
              
              <View style={styles.connectingContainer}>
                <Text style={styles.subtitle}>Connecting </Text>
                <Text style={styles.ngoText}>NGO</Text>
              </View>
              
              <View style={styles.descriptionOuterContainer}>
                <View style={styles.descriptionBorder} />
                <View style={styles.descriptionContainer}>
                  <Text 
                    style={styles.description}
                    accessibilityRole="text"
                  >
                    {currentItem.description}
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.button}
                accessibilityRole="button"
                accessibilityLabel="Explore NGOs"
                accessibilityHint="Navigate to explore NGOs page"
              >
                <LinearGradient
                  colors={['#164860', '#0d2e3d']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Explore NGOs</Text>
                  <Icon name="arrow-right" size={16} color="#fff" style={styles.buttonIcon} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            
            {/* Carousel indicators */}
            {CarouselIndicators}
            
            {/* Navigation buttons (moved to bottom corners) */}
            <View style={styles.navButtonsContainer}>
              <TouchableOpacity 
                style={[styles.navButton, styles.navButtonLeft]}
                onPress={handlePrevSlide}
                disabled={isTransitioning}
                accessibilityRole="button"
                accessibilityLabel="Previous slide"
              >
                <Icon name="chevron-left" size={20} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.navButton, styles.navButtonRight]}
                onPress={handleNextSlide}
                disabled={isTransitioning}
                accessibilityRole="button"
                accessibilityLabel="Next slide"
              >
                <Icon name="chevron-right" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            
            {/* Status indicator for screen readers */}
            {isScreenReaderEnabled && (
              <View style={styles.accessibilityStatus} accessibilityLiveRegion="polite">
                <Text accessibilityRole="text">
                  Slide {currentIndex + 1} of {heroItems.length}
                </Text>
              </View>
            )}
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroWrapper: {
    width: '100%',
    overflow: 'hidden', // Prevent content from going outside the container
    position: 'relative',
  },
  backgroundLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0e2433', // Dark background color to prevent white flashes
    zIndex: -1,
  },
  slideContainer: {
    width: '100%',
  },
  container: {
    height: 450,
    width: '100%',
  },
  overlay: {
    padding: 0,
    height: '100%',
    justifyContent: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  contentWrapper: {
    paddingHorizontal: 22,
    paddingBottom: -10,
    // paddingTop: 25,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    lineHeight: 42,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 35,
    color: 'white',
    fontWeight: '300',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  connectingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ngoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0ee6b7',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  descriptionOuterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 2,
    alignItems: 'stretch',
  },
  descriptionBorder: {
    width: 4,
    backgroundColor: '#0ee6b7',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    marginRight: 0,
  },
  descriptionContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 12,
    flex: 1,
    maxWidth: 330,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  description: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
  },
  button: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    alignSelf: 'flex-start',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(22, 72, 96, 0.7)',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    marginRight: 8,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    zIndex: 2,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#0ee6b7',
    width: 12,
    height: 8,
  },
  navButtonsContainer: {
    position: 'absolute',
    top: 35,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    pointerEvents: 'box-none',
    paddingHorizontal: 5,
    zIndex: 10,
  },
  navButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },
  navButtonLeft: {
    marginLeft: 9,
  },
  navButtonRight: {
    marginRight: 8,
  },
  accessibilityStatus: {
    position: 'absolute',
    left: -10000,
    top: -10000,
    width: 1,
    height: 1,
    overflow: 'hidden',
  }
});

export default Hero;
