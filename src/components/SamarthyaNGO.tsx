import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Dimensions,
  Platform,
  Animated,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const SamarthyaNGO = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [isExpanded, setIsExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  
  const toggleMenu = () => {
    const toValue = isExpanded ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const firstButtonStyle = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -50],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        }),
      },
    ],
    opacity: animation,
  };

  const secondButtonStyle = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -104],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 35],
        }),
      },
    ],
    opacity: animation,
  };

  const thirdButtonStyle = {
    transform: [
      { scale: animation },
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -63],
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 90],
        }),
      },
    ],
    opacity: animation,
  };

  const inlineFabContainer: ViewStyle = {
    position: 'relative',
    alignItems: 'flex-end' as const,
    marginTop: 6,
    height: 40,
    marginBottom: 7,
    marginRight: 9,
  };

  const fab: ViewStyle = {
    backgroundColor: '#00BFA6',
    width: 53,
    height: 53,
    borderRadius: 30,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    elevation: 5,
    shadowColor: '#00BFA6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'absolute',
    bottom: 0,
    right: 0,
  };

  const fabButton: ViewStyle = {
    position: 'absolute',
    right: 0,
    bottom: 40,
    alignItems: 'center' as const,
    zIndex: 1,
  };

  const actionButton: ViewStyle = {
    flexDirection: 'row' as const,
    backgroundColor: '#00BFA6',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 60,
    minWidth: 120,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  };

  const outlineButton: ViewStyle = {
    flexDirection: 'row' as const,
    padding: 9,
    borderWidth: 1,
    borderColor: '#00BFA6',
    borderRadius: 20,
    alignItems: 'center' as const,
    backgroundColor: '#fff',
  };

  const actionButtonText: TextStyle = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };
  
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>
      <Image
        source={{ uri: 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741847550/samarthyaidimage_qyu0eb.webp' }}
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </View>
  );

  const renderNGOInfo = () => (
    <View style={styles.ngoInfoContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741847678/samarthya_opy14x.jpg' }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.ngoInfoContent}>
        <View style={styles.ngoInfoMain}>
          <Text style={styles.ngoName}>Samarthya Kalyankari Sanstha</Text>
          <Text style={styles.ngoId}>NGO ID: MH-2017-0164886</Text>
          <Text style={styles.ngoEstablished}>Established: 2008</Text>
          <View style={inlineFabContainer}>
            <Animated.View style={[fabButton, thirdButtonStyle]}>
              <TouchableOpacity style={outlineButton}>
                <Icon name="phone" size={16} color="#00BFA6" style={styles.buttonIcon} />
                <Text style={[styles.outlineButtonText, { color: '#00BFA6' }]}>Contact</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[fabButton, secondButtonStyle]}>
              <TouchableOpacity style={outlineButton}>
                <Icon name="share-alt" size={16} color="#00BFA6" style={styles.buttonIcon} />
                <Text style={[styles.outlineButtonText, { color: '#00BFA6' }]}>Share</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[fabButton, firstButtonStyle]}>
              <TouchableOpacity style={actionButton}>
                <Icon name="heart" size={16} color="#fff" style={styles.buttonIcon} />
                <Text style={[actionButtonText, { color: '#fff' }]}>Donate</Text>
              </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity 
              style={fab}
              onPress={toggleMenu}
            >
              <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                <Icon name="plus" size={26} color="#fff" />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.categoryContainer, { marginTop: 0 }]}>
          <Text style={styles.categoryText}>#Children</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#164860" />
          <Icon name="star" size={16} color="#164860" />
          <Icon name="star" size={16} color="#164860" />
          <Icon name="star" size={16} color="#164860" />
          <Icon name="star-half-o" size={16} color="#164860" />
          <Text style={styles.ratingText}> (4.5)</Text>
        </View>
      </View>
    </View>
  );
  
  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'about' && styles.activeTab]} 
        onPress={() => setActiveTab('about')}
      >
        <View style={styles.tabButtonContent}>
          <Icon name="info-circle" size={16} color={activeTab === 'about' ? '#00BFA6' : '#64748B'} style={styles.tabIcon} />
          <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>About</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'campaigns' && styles.activeTab]}
        onPress={() => setActiveTab('campaigns')}
      >
        <View style={styles.tabButtonContent}>
          <Icon name="bullhorn" size={16} color={activeTab === 'campaigns' ? '#00BFA6' : '#64748B'} style={styles.tabIcon} />
          <Text style={[styles.tabText, activeTab === 'campaigns' && styles.activeTabText]}>Campaigns</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tabButton, activeTab === 'contact' && styles.activeTab]}
        onPress={() => setActiveTab('contact')}
      >
        <View style={styles.tabButtonContent}>
          <Icon name="phone" size={16} color={activeTab === 'contact' ? '#00BFA6' : '#64748B'} style={styles.tabIcon} />
          <Text style={[styles.tabText, activeTab === 'contact' && styles.activeTabText]}>Contact</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderAboutContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>About NGO</Text>
      <Text style={styles.aboutText}>
        Samarthya is a development organization, working with marginalized communities 
        on access to quality primary education, strengthening and promoting community 
        based organisations, youth leadership and development, women and girls 
        empowerment and disaster risk reduction. It represents the conviction that every 
        individual is entitled to live in security, dignity and peace. Our existence is rooted in 
        our commitment to promote a democratic society, and enable marginalized groups 
        to access human rights. Samarthya was founded in 2008 under Bombay Public Trust 
        Act—1950 and Societies Registration Act—1860.
      </Text>
    </View>
  );

  const renderCampaignsContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Top Stories</Text>
      
      <View style={styles.storyCard}>
        <Image
          source={{ uri: 'https://placekitten.com/300/200' }}
          style={styles.storyImage}
          resizeMode="cover"
        />
        <View style={styles.storyContent}>
          <Text style={styles.storyTitle}>Community education program</Text>
          <Text style={styles.storyDescription}>
            Supporting rural women's education initiatives across Maharashtra
          </Text>
          <TouchableOpacity style={styles.readMoreButton}>
            <Text style={styles.readMoreText}>Read More</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.storyCard}>
        <Image
          source={{ uri: 'https://placekitten.com/300/201' }}
          style={styles.storyImage}
          resizeMode="cover"
        />
        <View style={styles.storyContent}>
          <Text style={styles.storyTitle}>Youth leadership development</Text>
          <Text style={styles.storyDescription}>
            Building confidence and skills in rural youth to drive community change
          </Text>
          <TouchableOpacity style={styles.readMoreButton}>
            <Text style={styles.readMoreText}>Read More</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderContactContent = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.sectionTitle}>Contact</Text>
      
      <View style={styles.contactItem}>
        <Icon name="envelope" size={18} color="#64748B" style={styles.contactIcon} />
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Email:</Text>
          <Text style={styles.contactValue}>maha.samarthya@gmail.com</Text>
        </View>
      </View>
      
      <View style={styles.contactItem}>
        <Icon name="user" size={18} color="#64748B" style={styles.contactIcon} />
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Authorized Person:</Text>
          <Text style={[styles.contactValue,styles.contactValueperson]}>Ranjita Pawar</Text>
        </View>
      </View>
      
      <View style={styles.contactItem}>
        <Icon name="phone" size={18} color="#64748B" style={styles.contactIcon} />
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Phone:</Text>
          <Text 
            style={[styles.contactValue, styles.phoneLink]}
            onPress={() => Linking.openURL('tel:9765363734')}
          >
            9765363734
          </Text>
        </View>
      </View>
      
      <View style={styles.contactItem}>
        <Icon name="globe" size={18} color="#64748B" style={styles.contactIcon} />
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Website:</Text>
          <Text 
            style={[styles.contactValue, styles.websiteLink]}
            onPress={() => openLink('https://www.mahasamarthya.org/')}
          >
            https://www.mahasamarthya.org/
          </Text>
        </View>
      </View>
      
      <View style={styles.socialIcons}>
        <TouchableOpacity style={styles.socialIcon}>
          <Icon name="youtube" size={24} color="#FF0000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Icon name="facebook" size={24} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Icon name="linkedin" size={24} color="#0077B5" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <Icon name="twitter" size={24} color="#1DA1F2" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.locationTitle}>Location</Text>
      <Text style={styles.locationText}>
        At Sardarnagar Post Kader Tal Omerga, Dist. Osmanabad, Maharashtra, 413606 India
      </Text>
      
      <View style={styles.mapContainer}>
        <WebView
          source={{ uri: 'https://www.openstreetmap.org/export/embed.html?bbox=75.9,18.2,76.1,18.4&layer=mapnik&marker=18.3,76.0' }}
          style={styles.map}
        />
      </View>
    </View>
  );
  
  const renderContent = () => {
    switch(activeTab) {
      case 'about':
        return renderAboutContent();
      case 'campaigns':
        return renderCampaignsContent();
      case 'contact':
        return renderContactContent();
      default:
        return renderAboutContent();
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {renderHeader()}
        <View style={styles.infoAndTabsContainer}>
          {renderNGOInfo()}
          {renderTabs()}
        </View>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    position: 'relative',
    height: 200,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  infoAndTabsContainer: {
    marginTop: -20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.85)',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  ngoInfoContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'transparent',
  },
  ngoInfoContent: {
    marginLeft: 15,
    flex: 1,
  },
  ngoInfoMain: {
    marginBottom: -32,
  },
  ngoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E3E5C',
    marginBottom: 6,
  },
  ngoId: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 3,
    marginBottom: 4,
  },
  ngoEstablished: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  categoryContainer: {
    backgroundColor: '#E6F2FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 4,
    marginBottom: 8,
  },
  categoryText: {
    color: '#0066CC',
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 12,
    color: '#64748B',
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  donateButton: {
    backgroundColor: '#00BFA6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  donateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingBottom: 14,
    alignItems: 'center',
  },
  tabButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    marginRight: 5,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#00BFA6',
    marginBottom: -1,
  },
  tabText: {
    fontSize: 14,
    color: '#64748B',
  },
  activeTabText: {
    color: '#00BFA6',
    fontWeight: 'bold',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 0,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
    marginBottom: Platform.OS === 'ios' ? 20 : 15,
    ...Platform.select({
      android: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      },
      ios: {
        shadowRadius: 3,
      }
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#164860',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4A5568',
  },
  storyCard: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  storyImage: {
    width: '100%',
    height: 160,
  },
  storyContent: {
    padding: 12,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E3E5C',
    marginBottom: 6,
  },
  storyDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 10,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    color: '#0066CC',
    fontWeight: '500',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  contactIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  contactValue: {
    fontSize: 14,
    color: '#00BFA6',
  },
  phoneLink: {
    color: '#0066CC',
  },
  websiteLink: {
    color: '#00BFA6',
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  socialIcon: {
    marginRight: 20,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E3E5C',
    marginTop: 10,
    marginBottom: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 12,
  },
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 20,
  },
  contactValueperson:{
    color:'#64748B',
  },
  buttonIcon: {
    marginRight: 8,
  },
  outlineButtonText: {
    color: '#F59E0B',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default SamarthyaNGO;