import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Quick Links</Text>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Find NGOs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Contact</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Support</Text>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>FAQs</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.bottomSection}>
        <View style={styles.socialLinks}>
          <TouchableOpacity style={styles.socialIcon}>
            <Icon name="facebook" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Icon name="twitter" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Icon name="instagram" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Icon name="linkedin" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.copyright}>
          © 2023 Noble Giving. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#164860',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  column: {
    flex: 1,
  },
  columnTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  link: {
    marginBottom: 10,
  },
  linkText: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 24,
  },
  bottomSection: {
    alignItems: 'center',
  },
  socialLinks: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  copyright: {
    color: '#fff',
    opacity: 0.6,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Footer; 