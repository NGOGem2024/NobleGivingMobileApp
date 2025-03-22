import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const UserJourneys = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>How It Works</Text>
      </View>
      
      <View style={styles.journeysContainer}>
        {/* For NGOs Section */}
        <View style={styles.journeyCard}>
          <View style={styles.journeyHeader}>
            <Text style={styles.journeyTitle}>For NGOs</Text>
          </View>
          
          <View style={styles.journeyContent}>
            <View style={styles.stepContainer}>
              <View style={styles.stepIcon}>
                <Icon name="check" size={20} color="#fff" />
              </View>
              <View style={styles.stepTextContainer}>
                <Text style={styles.stepTitle}>1. We've Got You Covered</Text>
                <Text style={styles.stepDescription}>
                  Get Verified in 48 Hours. Get in touch with us! We'll review your nonprofit's details within 24 hours, so you can focus on what matters most.
                </Text>
              </View>
            </View>
            
            <View style={styles.stepIndicator} />
            
            <TouchableOpacity style={styles.journeyButton}>
              <Text style={styles.journeyButtonText}>Register Your NGO</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* For Donors Section */}
        <View style={[styles.journeyCard, styles.donorCard]}>
          <View style={styles.journeyHeader}>
            <Text style={styles.journeyTitle}>For Donors</Text>
          </View>
          
          <View style={styles.journeyContent}>
            <View style={styles.stepContainer}>
              <View style={[styles.stepIcon, styles.donorStepIcon]}>
                <Icon name="search" size={20} color="#fff" />
              </View>
              <View style={styles.stepTextContainer}>
                <Text style={styles.stepTitle}>1. Explore Our Causes</Text>
                <Text style={styles.stepDescription}>
                  When so spoilt you're considering supporting our mission! Take some time to explore the various charitable causes and programs we support.
                </Text>
              </View>
            </View>
            
            <View style={styles.stepIndicator} />
            
            <TouchableOpacity style={[styles.journeyButton, styles.donorButton]}>
              <Text style={styles.journeyButtonText}>Explore Causes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#164860',
  },
  journeysContainer: {
    gap: 20,
  },
  journeyCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  donorCard: {
    marginTop: 16,
  },
  journeyHeader: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  journeyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#164860',
  },
  journeyContent: {
    padding: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#164860',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  donorStepIcon: {
    backgroundColor: '#20809e',
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  stepDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  stepIndicator: {
    width: 2,
    height: 30,
    backgroundColor: '#ddd',
    marginLeft: 20,
    marginBottom: 16,
  },
  journeyButton: {
    backgroundColor: '#164860',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  donorButton: {
    backgroundColor: '#20809e',
  },
  journeyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UserJourneys; 