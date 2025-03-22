import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const MissionSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.missionTitle}>Our Mission</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop' }} 
            style={styles.image}
          />
          <View style={styles.overlayImage}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800&auto=format&fit=crop' }} 
              style={styles.secondaryImage}
            />
          </View>
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.missionStatement}>
            Noble Giving empowers donors, connects causes, and drives measurable social impact through innovative philanthropy
          </Text>
          
          <Text style={styles.visionTitle}>Our Vision</Text>
          <Text style={styles.visionText}>
            Empowering a sustainable future by transforming global philanthropy via our universal platform for positive change and lasting impact.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#164860',
    fontWeight: '600',
  },
  missionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#164860',
    marginTop: 4,
  },
  contentContainer: {
    flexDirection: 'column',
  },
  imageContainer: {
    position: 'relative',
    height: 180,
    marginBottom: 24,
  },
  image: {
    width: '85%',
    height: 160,
    borderRadius: 16,
  },
  overlayImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 120,
    height: 120,
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
  },
  missionStatement: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  visionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#164860',
    marginBottom: 8,
  },
  visionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
  },
});

export default MissionSection; 