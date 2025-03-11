import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedCampaigns from '../components/FeaturedCampaigns';
import Categories from '../components/Categories';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = () => {
  return (
    <ScrollView>

      <StatusBar backgroundColor="#164860" barStyle="light-content" />
      <Header/>
      <Hero/>
      <FeaturedCampaigns/>
      <Categories/>
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
