import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


const Header = ({ }) => {
  return (
    <View style={styles.header}>
      {/* App Title */}
      <TouchableOpacity   style={styles.titleContainer}>
      <Image
      source={require('../assets/logo1.png')} // Replace with your splash logo
                        style={styles.logoImage} />
      <Text style={styles.title}>NobleGiving</Text>
        </TouchableOpacity>

      {/* Right-side Icons */}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="search" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
        <Image
      source={require('../assets/basket.png')} // Replace with your splash logo
                        style={styles.basketImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#164860',
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 20, // Shadow for Android
    shadowColor: 'black', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
    marginRight: 5,
  },
  profileContainer: {
    marginLeft: 15,
  },
  logoImage: {
    width: 39,
    height: 39,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'white',
    marginRight: 5,
    marginLeft: 5,
  },
  basketImage: {
    width: 30,
    height: 30,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: 'white',
    marginRight: 5,
    marginLeft: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
