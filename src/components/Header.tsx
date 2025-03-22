import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  BasketScreen: undefined;
  Home: undefined;
  // Add other screens as needed
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface HeaderProps {
  basketItemCount?: number;
  showBackButton?: boolean;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  basketItemCount = 0, 
  showBackButton = false,
  title = 'NobleGiving'
}) => {
  const navigation = useNavigation<NavigationProp>();
  
  const navigateToBasket = () => {
    navigation.navigate('BasketScreen');
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const goBack = () => {
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={{ backgroundColor: '#164860' }}>
      <StatusBar barStyle="light-content" backgroundColor="#164860" />
      <View style={styles.header}>
        {/* Left side - Back button or Logo */}
        {showBackButton ? (
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.titleContainer} onPress={navigateToHome}>
            <Image
              source={require('../assets/logo1.png')} 
              style={styles.logoImage} 
            />
            <Text style={styles.title}>{title}</Text>
          </TouchableOpacity>
        )}

        {/* Right-side Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={navigateToBasket}
          >
            <Image
              source={require('../assets/basket.png')} 
              style={styles.basketImage} 
            />
            {basketItemCount > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>
                  {basketItemCount > 99 ? '99+' : basketItemCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#164860',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.25,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  backButton: {
    padding: 8,
  },
  logoImage: {
    width: 32,
    height: 32,
    borderRadius: 0,
    marginRight: 8,
    marginLeft: 0,
  },
  basketImage: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF5252',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderWidth: 1,
    borderColor: 'white',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Header;
