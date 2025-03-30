import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, StatusBar, RefreshControl, View } from 'react-native';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedCampaigns from '../components/FeaturedCampaigns';
import Categories from '../components/Categories';
import MissionSection from '../components/MissionSection';
import DonationImpact from '../components/DonationImpact';
import UserJourneys from '../components/UserJourneys';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useRef(null);
  const [componentsKey, setComponentsKey] = useState(0);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      // Force re-render of components by changing the key
      setComponentsKey(prevKey => prevKey + 1);
    } catch (error) {
      console.log('Error refreshing:', error);
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 1000); // Short delay to make the refresh animation visible
    }
  }, []);

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      ref={scrollViewRef}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#164860"
          colors={['#164860']}
        />
      }
    >
      <StatusBar backgroundColor="#164860" barStyle="light-content" />
      <Header />
      <Hero key={`hero-${componentsKey}`} />
      <FeaturedCampaigns key={`featured-${componentsKey}`} />
      <Categories key={`categories-${componentsKey}`} />
      <MissionSection key={`mission-${componentsKey}`} />
      {/* <DonationImpact key={`impact-${componentsKey}`} /> */}
      {/* <UserJourneys key={`journeys-${componentsKey}`} /> */}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f7ff',
  },
  bottomPadding: {
    height: 60, // Adjust this value based on your bottom bar height
  },
});

export default HomeScreen;
