import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Dimensions, Modal, Animated } from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(0));

  const handleLogoutPress = () => {
    setShowLogoutModal(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => setShowLogoutModal(false));
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    scaleAnim.setValue(0);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userData');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#1E6B91', '#2988B5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientHeader}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatarSection}>
              <Image
                source={{ uri: 'data:image/jpeg;base64,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' }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editButton}>
                <LinearGradient
                  colors={['#ffffff', '#f8f8f8']}
                  style={styles.editButtonGradient}
                >
                  <Icon name="edit-2" size={18} color="#164860" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.name}>Mayur Dhamgunde</Text>
              <Text style={styles.email}>mayurdhamgunde@gmail.com</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Donations</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>$1,240</Text>
                <Text style={styles.statLabel}>Total Given</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.mainContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.actionButton}>
                <LinearGradient
                  colors={['#1E6B91', '#2988B5']}
                  style={styles.actionGradient}
                >
                  <Icon name="heart" size={24} color="#fff" />
                </LinearGradient>
                <Text style={styles.actionText}>Donate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <LinearGradient
                  colors={['#1E6B91', '#2988B5']}
                  style={styles.actionGradient}
                >
                  <Icon name="clock" size={24} color="#fff" />
                </LinearGradient>
                <Text style={styles.actionText}>History</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <LinearGradient
                  colors={['#1E6B91', '#2988B5']}
                  style={styles.actionGradient}
                >
                  <Icon name="star" size={24} color="#fff" />
                </LinearGradient>
                <Text style={styles.actionText}>Favorites</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <View style={styles.menuContainer}>
              <TouchableOpacity style={styles.menuItem}>
                <Icon name="user" size={22} color="#164860" />
                <Text style={styles.menuText}>Edit Profile</Text>
                <Icon name="chevron-right" size={20} color="#999" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Icon name="bell" size={22} color="#164860" />
                <Text style={styles.menuText}>Notifications</Text>
                <Icon name="chevron-right" size={20} color="#999" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Icon name="lock" size={22} color="#164860" />
                <Text style={styles.menuText}>Privacy & Security</Text>
                <Icon name="chevron-right" size={20} color="#999" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.menuItem, styles.logoutItem]}
                onPress={handleLogoutPress}
              >
                <Icon name="log-out" size={22} color="#FF3B30" />
                <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Logout Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={handleCloseModal}
        >
          <Animated.View 
            style={[
              styles.modalContent,
              {
                transform: [
                  {
                    scale: scaleAnim
                  }
                ]
              }
            ]}
          >
            <LinearGradient
              colors={['#1E6B91', '#2988B5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalHeader}
            >
              <Icon name="log-out" size={28} color="#fff" />
              <Text style={styles.modalTitle}>Log out of NobleGiving</Text>
            </LinearGradient>
            <Text style={styles.modalMessage}>Are you sure you want to log out?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={handleCloseModal}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.logoutButton]} 
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  gradientHeader: {
    paddingTop: 15,
  },
  profileHeader: {
    padding: 24,
  },
  avatarSection: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  editButton: {
    position: 'absolute',
    right: 130,
    bottom: 0,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  editButtonGradient: {
    width: 31,
    height: 31,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  mainContent: {
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    paddingTop: 11,
  },
  section: {
    padding: 26,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#164860',
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: -22,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#164860',
    fontWeight: '500',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#FF3B30',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: width * 0.85,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    padding: 20,
    alignItems: 'center',
    gap: 12,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  logoutButton: {
    backgroundColor: '#fff',
  },
  cancelButtonText: {
    color: '#164860',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UserProfileScreen; 