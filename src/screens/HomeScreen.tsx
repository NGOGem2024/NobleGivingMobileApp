import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedCampaigns from '../components/FeaturedCampaigns';
import Categories from '../components/Categories';
import MissionSection from '../components/MissionSection';
import DonationImpact from '../components/DonationImpact';
import UserJourneys from '../components/UserJourneys';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#164860" barStyle="light-content" />
      <Header />
      <Hero />
      <FeaturedCampaigns />
      <Categories />
      <MissionSection />
      <DonationImpact />
      <UserJourneys />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f7ff',
  },
});

export default HomeScreen;
