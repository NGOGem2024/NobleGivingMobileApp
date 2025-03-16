import React, { useState, useRef, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiService } from '../services/apiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NGODetailScreen = ({ ngoId }: { ngoId?: string }) => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get ngoId from props or route params
  const ngoIdToUse = ngoId || (route.params as any)?.ngoId || "66c47659f618b819aabe91b4"; // Default to Samarthya if not provided
  
  const [activeTab, setActiveTab] = useState('about');
  const [isExpanded, setIsExpanded] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;
  
  // Add state for API data
  const [ngoData, setNgoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInBasket, setIsInBasket] = useState(false);
  
  // Add a function to handle adding/removing from basket
  const handleBasketAction = async () => {
    try {
      // Get current basket items
      const basketData = await AsyncStorage.getItem('basketItems');
      let basketItems = basketData ? JSON.parse(basketData) : [];
      
      if (isInBasket) {
        // Remove from basket
        basketItems = basketItems.filter((item: any) => item.id !== ngoIdToUse);
        setIsInBasket(false);
      } else {
        // Add to basket
        const ngoForBasket = {
          id: ngoIdToUse,
          ngo_name: ngoData?.ngo_name || 'Samarthya Kalyankari Sanstha',
          ngo_profile_photo: ngoData?.ngo_profile_photo || 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741847678/samarthya_opy14x.jpg',
          ngo_category: ngoData?.ngo_category || ['Children'],
          ngo_established: ngoData?.ngo_established || '2008',
          ngo_id: ngoData?.ngo_id || 'MH-2017-0164886',
          rating: ngoData?.rating || '4.5'
        };
        
        // Check if already in basket
        const existingIndex = basketItems.findIndex((item: any) => item.id === ngoIdToUse);
        if (existingIndex === -1) {
          basketItems.push(ngoForBasket);
        }
        
        setIsInBasket(true);
      }
      
      // Save updated basket
      await AsyncStorage.setItem('basketItems', JSON.stringify(basketItems));
    } catch (error) {
      console.error('Error updating basket:', error);
    }
  };
  
  // Check if NGO is in basket when component loads
  const checkIfInBasket = async () => {
    try {
      const basketData = await AsyncStorage.getItem('basketItems');
      if (basketData) {
        const basketItems = JSON.parse(basketData);
        const isInBasket = basketItems.some((item: any) => item.id === ngoIdToUse);
        setIsInBasket(isInBasket);
      }
    } catch (error) {
      console.error('Error checking basket:', error);
    }
  };
  
  useEffect(() => {
    fetchNGOData();
    checkIfInBasket();
  }, [ngoIdToUse]); // Refetch when ngoId changes
  
  const fetchNGOData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getNGOById(ngoIdToUse);
      setNgoData(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch NGO data:', err);
      setError('Failed to load NGO data');
    } finally {
      setLoading(false);
    }
  };
  
  const toggleMenu = () => {
    const toValue = isExpanded ? 0 : 1;
    Animated.spring(menuAnimation, {
      toValue,
      friction: 8,
      tension: 40,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const rotation = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const fab: ViewStyle = {
    backgroundColor: '#00BFA6',
    width: 53,
    height: 53,
    borderRadius: 100,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    elevation: 4,
    position: 'absolute',
    right: 18,
    bottom: 18,
    zIndex: 1000,
    shadowColor: '#00BFA6',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 9,
  };

  const getMenuButtonStyles = () => {
    const verticalSpacing = 65; // Vertical spacing between buttons
    
    // First button - top position
    const firstButtonStyle = {
      transform: [
        { scale: menuAnimation },
        {
          translateY: menuAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -verticalSpacing],
          }),
        },
      ],
    };

    // Second button - middle position
    const secondButtonStyle = {
      transform: [
        { scale: menuAnimation },
        {
          translateY: menuAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -verticalSpacing * 2],
          }),
        },
      ],
    };

    // Third button - highest position
    const thirdButtonStyle = {
      transform: [
        { scale: menuAnimation },
        {
          translateY: menuAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -verticalSpacing * 3],
          }),
        },
      ],
    };

    return { firstButtonStyle, secondButtonStyle, thirdButtonStyle };
  };

  const inlineFabContainer: ViewStyle = {
    position: 'absolute',
    right: 20,
    bottom: 20,
    pointerEvents: 'box-none',
    zIndex: 999,
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
        source={{ uri: ngoData?.ngo_banner_image || 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741847550/samarthyaidimage_qyu0eb.webp' }}
        style={styles.bannerImage}
        resizeMode="cover"
      />
    </View>
  );

  const renderNGOInfo = () => (
    <View style={styles.ngoInfoContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: ngoData?.ngo_profile_photo || 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741847678/samarthya_opy14x.jpg' }}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.ngoInfoContent}>
        <View style={styles.ngoInfoMain}>
          <Text style={styles.ngoName}>{ngoData?.ngo_name || 'Samarthya Kalyankari Sanstha'}</Text>
          <Text style={styles.ngoId}>NGO ID: {ngoData?.ngo_id || 'MH-2017-0164886'}</Text>
          <Text style={styles.ngoEstablished}>Established: {ngoData?.ngo_established || '2008'}</Text>
        </View>
        <View style={styles.categoryContainer}>
          {ngoData?.ngo_category ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {ngoData.ngo_category.map((category: string, index: number) => (
                <Text key={index} style={[styles.categoryText, index > 0 && {marginLeft: 8}]}>
                  #{category}
                </Text>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.categoryText}>#Children</Text>
          )}
        </View>
        <View style={styles.ratingAndBasketContainer}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#164860" />
            <Icon name="star" size={16} color="#164860" />
            <Icon name="star" size={16} color="#164860" />
            <Icon name="star" size={16} color="#164860" />
            <Icon name="star-half-o" size={16} color="#164860" />
            <Text style={styles.ratingText}> ({ngoData?.rating || '4.5'})</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.basketButton}
            onPress={handleBasketAction}
          >
            <View style={styles.basketButtonContent}>
              <Image 
                source={require('../assets/enahnced-basket.png')}
                style={{width: 15, height: 18, ...styles.buttonIcon}} 
              />
              <Text style={styles.basketButtonText}>
                {isInBasket ? 'Remove from Basket' : 'Add to Basket'}
              </Text>
            </View>
          </TouchableOpacity>
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
        {ngoData?.ngo_about || 
          'Samarthya is a development organization, working with marginalized communities on access to quality primary education, strengthening and promoting community based organisations, youth leadership and development, women and girls empowerment and disaster risk reduction. It represents the conviction that every individual is entitled to live in security, dignity and peace. Our existence is rooted in our commitment to promote a democratic society, and enable marginalized groups to access human rights. Samarthya was founded in 2008 under Bombay Public Trust Act—1950 and Societies Registration Act—1860.'}
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
          <Text style={styles.contactValue}>{ngoData?.ngo_email || 'maha.samarthya@gmail.com'}</Text>
        </View>
      </View>
      
      <View style={styles.contactItem}>
        <Icon name="user" size={18} color="#64748B" style={styles.contactIcon} />
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Authorized Person:</Text>
          <Text style={[styles.contactValue,styles.contactValueperson]}>
            {ngoData?.ngo_authorised_person || 'Ranjita Pawar'}
          </Text>
        </View>
      </View>
      
      <View style={styles.contactItem}>
        <Icon name="phone" size={18} color="#64748B" style={styles.contactIcon} />
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Phone:</Text>
          <Text 
            style={[styles.contactValue, styles.phoneLink]}
            onPress={() => Linking.openURL(`tel:${ngoData?.ngo_phone || '9765363734'}`)}
          >
            {ngoData?.ngo_phone || '9765363734'}
          </Text>
        </View>
      </View>
      
      <View style={styles.contactItem}>
        <Icon name="globe" size={18} color="#64748B" style={styles.contactIcon} />
        <View style={styles.contactInfo}>
          <Text style={styles.contactLabel}>Website:</Text>
          <Text 
            style={[styles.contactValue, styles.websiteLink]}
            onPress={() => openLink(ngoData?.ngo_website || 'https://www.mahasamarthya.org/')}
          >
            {ngoData?.ngo_website || 'https://www.mahasamarthya.org/'}
          </Text>
        </View>
      </View>
      
      <View style={styles.socialIcons}>
        {ngoData?.socialMedia?.youtube && (
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => openLink(ngoData.socialMedia.youtube)}
          >
            <Icon name="youtube" size={24} color="#FF0000" />
          </TouchableOpacity>
        )}
        {ngoData?.socialMedia?.facebook && (
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => openLink(ngoData.socialMedia.facebook)}
          >
            <Icon name="facebook" size={24} color="#3b5998" />
          </TouchableOpacity>
        )}
        {ngoData?.socialMedia?.instagram && (
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => openLink(ngoData.socialMedia.instagram)}
          >
            <Icon name="instagram" size={24} color="#C13584" />
          </TouchableOpacity>
        )}
        {ngoData?.socialMedia?.linkedin && (
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => openLink(ngoData.socialMedia.linkedin)}
          >
            <Icon name="linkedin" size={24} color="#0077B5" />
          </TouchableOpacity>
        )}
        {ngoData?.socialMedia?.twitter && (
          <TouchableOpacity 
            style={styles.socialIcon}
            onPress={() => openLink(ngoData.socialMedia.twitter)}
          >
            <Icon name="twitter" size={24} color="#1DA1F2" />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={styles.locationTitle}>Location</Text>
      <Text style={styles.locationText}>
        {ngoData?.ngo_location || 'At Sardarnagar Post Kader Tal Omerga, Dist. Osmanabad, Maharashtra, 413606 India'}
      </Text>
      
      <View style={styles.mapContainer}>
        <WebView
          source={{ 
            uri: ngoData?.ngo_position 
              ? `https://www.openstreetmap.org/export/embed.html?bbox=${ngoData.ngo_position[1]-0.1},${ngoData.ngo_position[0]-0.1},${ngoData.ngo_position[1]+0.1},${ngoData.ngo_position[0]+0.1}&layer=mapnik&marker=${ngoData.ngo_position[0]},${ngoData.ngo_position[1]}`
              : 'https://www.openstreetmap.org/export/embed.html?bbox=75.9,18.2,76.1,18.4&layer=mapnik&marker=18.3,76.0'
          }}
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
  
  // Add a function to handle donation
  const handleDonation = async () => {
    try {
      // First add to basket
      await handleBasketAction();
      
      // Then navigate with timestamp to force re-render
      navigation.navigate({
        name: 'BasketScreen',
        params: { refresh: new Date().getTime() },
        merge: true,
      } as never);
      
      console.log('Navigated to BasketScreen with refresh param:', new Date().getTime());
    } catch (error) {
      console.error('Error during donation process:', error);
    }
  };
  
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#00BFA6" />
        <Text style={styles.loadingText}>Loading NGO details...</Text>
      </SafeAreaView>
    );
  }
  
  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.errorContainer]}>
        <Icon name="exclamation-circle" size={50} color="#FF6B6B" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchNGOData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  
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
      
      {/* FAB Button */}
      <Animated.View style={[fab]}>
        <TouchableOpacity 
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
          onPress={toggleMenu}
        >
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <MaterialCommunityIcons name="plus" size={33} color="#fff" />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
      
      {/* Menu Items */}
      {(() => {
        const { firstButtonStyle, secondButtonStyle, thirdButtonStyle } = getMenuButtonStyles();
        return (
          <>
            <Animated.View style={[styles.fabMenuButton, { 
              transform: thirdButtonStyle.transform,
              opacity: menuAnimation
            }]}>
              <TouchableOpacity style={actionButton} onPress={handleDonation}>
                <MaterialCommunityIcons name="heart-outline" size={18} color="#fff" style={styles.buttonIcon} />
                
                <Text style={[actionButtonText, { color: '#fff' }]}>Donate</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.fabMenuButton, { 
              transform: secondButtonStyle.transform,
              opacity: menuAnimation
            }]}>
              <TouchableOpacity style={outlineButton}>
                <MaterialCommunityIcons name="message-text-outline" size={18} color="#00BFA6" style={styles.buttonIcon} />
                <Text style={[styles.outlineButtonText, { color: '#00BFA6' }]}>Message</Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.fabMenuButton, { 
              transform: firstButtonStyle.transform,
              opacity: menuAnimation
            }]}>
              <TouchableOpacity style={outlineButton}>
                <MaterialCommunityIcons name="video-outline" size={18} color="#00BFA6" style={styles.buttonIcon} />
                <Text style={[styles.outlineButtonText, { color: '#00BFA6' }]}>Video Call</Text>
              </TouchableOpacity>
            </Animated.View>
          </>
        );
      })()}
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
    padding: 16,
    backgroundColor: 'transparent',
    marginTop:10
  },
  ngoInfoContent: {
    marginLeft: 15,
    flex: 1,
  },
  ngoInfoMain: {
    marginBottom: 4,
  },
  ngoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E3E5C',
    marginBottom: 4,

    marginTop:5
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
    flexDirection: 'row',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  categoryText: {
    backgroundColor: '#E6F2FF',
    color: '#0066CC',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  ratingAndBasketContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#64748B',
    fontSize: 16,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    color: '#FF6B6B',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#00BFA6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  fabMenuButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  basketButton: {
    backgroundColor: '#00e5c945',
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 100,
    elevation: 5,
    shadowColor: '#00BFA6',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  basketButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  basketButtonText: {
    color: '#164860',
    opacity: 0.9,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default NGODetailScreen;