import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/Header';
import FeaturedCampaigns from '../components/FeaturedCampaigns';
import Categories from '../components/Categories';

const CampaignsScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        <Text style={styles.title}>All Campaigns</Text>
        <Categories />
        <FeaturedCampaigns />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#164860',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
});

export default CampaignsScreen; 