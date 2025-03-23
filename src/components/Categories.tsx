import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, findNodeHandle, UIManager } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing,
  FadeInDown,
  FadeIn,
  FadeInRight,
  SlideInRight,
  runOnJS
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = (width - 64) / 3; // 3 items per row with increased spacing

interface Category {
  id: string;
  name: string;
  icon: string;
  iconLib: 'Feather' | 'FontAwesome' | 'MaterialCommunityIcons' | 'Ionicons';
  bgColor: string;
  iconColor: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Education',
    icon: 'book',
    iconLib: 'Ionicons',
    bgColor: '#ffefe9',
    iconColor: '#ff6b6b',
  },
  {
    id: '2',
    name: 'Healthcare',
    icon: 'medical',
    iconLib: 'Ionicons',
    bgColor: '#e0f7ee',
    iconColor: '#0fc2c0',
  },
  {
    id: '3',
    name: 'Disaster Relief',
    icon: 'home',
    iconLib: 'Ionicons',
    bgColor: '#e3f2fd',
    iconColor: '#4d96ff',
  },
  {
    id: '4',
    name: 'Hunger',
    icon: 'nutrition',
    iconLib: 'Ionicons',
    bgColor: '#fff8e1',
    iconColor: '#ffb347',
  },
  {
    id: '5',
    name: 'Animal Welfare',
    icon: 'paw',
    iconLib: 'Ionicons',
    bgColor: '#f3e5f5',
    iconColor: '#9c27b0',
  },
  {
    id: '6',
    name: 'Environment',
    icon: 'leaf',
    iconLib: 'Ionicons',
    bgColor: '#e0f7f0',
    iconColor: '#4caf50',
  },
];

const renderCategoryIcon = (category: Category) => {
  const iconSize = 32; // Increased icon size
  
  switch (category.iconLib) {
    case 'Feather':
      return <Icon name={category.icon} size={iconSize} color={category.iconColor} />;
    case 'FontAwesome':
      return <FontAwesome name={category.icon} size={iconSize} color={category.iconColor} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={category.icon} size={iconSize} color={category.iconColor} />;
    case 'Ionicons':
      return <Ionicons name={category.icon} size={iconSize} color={category.iconColor} />;
    default:
      return <Icon name={category.icon} size={iconSize} color={category.iconColor} />;
  }
};

const CategoryItem = ({ category, index, animate }: { category: Category; index: number; animate: boolean }) => {
  const scale = useSharedValue(1);
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 150, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  };
  
  if (!animate) {
    return (
      <View style={styles.categoryItem}>
        <TouchableOpacity 
          activeOpacity={0.9}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.touchableContainer}
        >
          <View style={styles.itemContent}>
            <View style={[styles.iconCircle, { backgroundColor: category.bgColor }]}>
              {renderCategoryIcon(category)}
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <Animated.View 
      style={styles.categoryItem}
      entering={FadeInRight.delay(100 * index).duration(400)}
    >
      <TouchableOpacity 
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchableContainer}
      >
        <Animated.View style={[animatedStyles, styles.itemContent]}>
          <Animated.View 
            style={[styles.iconCircle, { backgroundColor: category.bgColor }]}
            entering={FadeIn.delay(200 * index)}
          >
            {renderCategoryIcon(category)}
          </Animated.View>
          <Animated.Text 
            style={styles.categoryName}
            entering={FadeIn.delay(300 + 50 * index)}
          >
            {category.name}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const Categories = () => {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const viewRef = useRef(null);
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
    if (viewRef.current) {
      const handle = findNodeHandle(viewRef.current);
      
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
            }, 800); // Longer delay before animations start (800ms)
          }
        });
      }
    }
  };

  if (!animate) {
    return (
      <View 
        ref={viewRef}
        style={styles.outerContainer}
      >
        <View style={styles.header}>
          <View style={styles.titleWrapper}>
            <View style={styles.titleIconContainer}>
              <Ionicons name="grid" size={22} color="#246A85" />
            </View>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          <TouchableOpacity style={styles.viewAllContainer}>
            <View>
              <View style={styles.viewAllContent}>
                <Text style={styles.viewAll}>View All</Text>
                <Icon name="chevron-right" size={18} color="#246A85" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.gridContainer}>
          {categories.map((category, index) => (
            <CategoryItem key={category.id} category={category} index={index} animate={false} />
          ))}
        </View>
      </View>
    );
  }

  return (
    <Animated.View 
      ref={viewRef}
      style={styles.outerContainer}
      entering={FadeInRight.duration(500)}
    >
      <Animated.View 
        style={styles.header}
        entering={FadeInRight.duration(400)}
      >
        <View style={styles.titleWrapper}>
          <View style={styles.titleIconContainer}>
            <Ionicons name="grid" size={22} color="#246A85" />
          </View>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <TouchableOpacity style={styles.viewAllContainer}>
          <Animated.View entering={FadeIn.delay(300)}>
            <View style={styles.viewAllContent}>
              <Text style={styles.viewAll}>View All</Text>
              <Icon name="chevron-right" size={18} color="#246A85" />
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
      
      <View style={styles.gridContainer}>
        {categories.map((category, index) => (
          <CategoryItem key={category.id} category={category} index={index} animate={true} />
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: 28,
    backgroundColor: '#f5f7f9',
    paddingHorizontal: 10,
    borderRadius: 16,
    margin: 9,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(36, 106, 133, 0.05)',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  titleIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#246A85',
  },
  viewAllContainer: {
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  viewAllContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAll: {
    fontSize: 15,
    color: '#246A85',
    marginRight: 5,
    fontWeight: '500',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    marginBottom: 28,
  },
  touchableContainer: {
    width: '100%',
    alignItems: 'center',
  },
  itemContent: {
    width: '100%',
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333333',
    marginTop: 4,
    width: '100%',
  },
});

export default Categories;
