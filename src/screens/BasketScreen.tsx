import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions
} from 'react-native';
import { useNavigation, NavigationProp, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '../services/apiServices';

// Define the NGO type
interface NGO {
  id: string;
  _id?: string;
  ngo_name: string;
  ngo_profile_photo: string;
  ngo_category: string[];
  ngo_established: string;
  ngo_id: string;
  rating: string;
  ngo_banner_image?: string;
  imageUrl?: string;
  bannerImage?: string;
}

// Define the RootStackParamList for navigation
type RootStackParamList = {
  NGOScreen: undefined;
  NGODetailScreen: { ngoId: string };
};

// Fallback banner images to ensure variety
const FALLBACK_BANNER_IMAGES = [
  'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757240/samarthya-Kalyankari_quxzvw.webp',
  'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757239/smileorgamization_uhng2s.jpg',
  'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757240/spherule_foundation_gxd44q.jpg',
  'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757240/jeevan-adhaar-society_ljgi4x.jpg',
  'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757240/Sahayog_phxron.jpg',
  'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757240/snehasharaya-foundation_lm8iu9.jpg',
  'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757239/centreforsocial-responsibilty_zdauzd.webp',
  'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757239/pagaria-welfare-foundation_dwk6hf.webp'
];

const BasketScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const [basketItems, setBasketItems] = useState<NGO[]>([]);
  const [loading, setLoading] = useState(true);
  const [allNGOs, setAllNGOs] = useState<NGO[]>([]);

  useEffect(() => {
    fetchAllNGOs();
    loadBasketItems();
    // This will log when the screen refreshes due to params change
    console.log('BasketScreen refreshed with params:', route.params);
  }, [route.params]); // Add route.params as a dependency to refresh when navigation occurs

  const fetchAllNGOs = async () => {
    try {
      const response = await apiService.getAllNGOs();
      if (response && response.ngos && Array.isArray(response.ngos)) {
        console.log('Successfully fetched all NGOs for reference');
        setAllNGOs(response.ngos);
      }
    } catch (error) {
      console.error('Failed to fetch all NGOs:', error);
    }
  };

  const loadBasketItems = async () => {
    try {
      setLoading(true);
      const basketData = await AsyncStorage.getItem('basketItems');
      if (basketData) {
        const items = JSON.parse(basketData);
        console.log('Loaded basket items:', JSON.stringify(items, null, 2));
        setBasketItems(items);
      }
    } catch (error) {
      console.error('Failed to load basket items:', error);
      Alert.alert('Error', 'Failed to load your basket items');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get the banner image for an NGO
  const getBannerImage = (ngo: NGO) => {
    // First check if this NGO has a banner image directly
    if (ngo.ngo_banner_image) {
      console.log(`NGO ${ngo.ngo_name} has direct ngo_banner_image: ${ngo.ngo_banner_image}`);
      return ngo.ngo_banner_image;
    }
    
    if (ngo.bannerImage) {
      console.log(`NGO ${ngo.ngo_name} has direct bannerImage: ${ngo.bannerImage}`);
      return ngo.bannerImage;
    }
    
    if (ngo.imageUrl) {
      console.log(`NGO ${ngo.ngo_name} has direct imageUrl: ${ngo.imageUrl}`);
      return ngo.imageUrl;
    }
    
    // If no direct image, try to find this NGO in our allNGOs list from API
    const ngoId = ngo.id || ngo._id;
    const matchingNGO = allNGOs.find(apiNgo => 
      (apiNgo.id === ngoId || apiNgo._id === ngoId || apiNgo.ngo_id === ngo.ngo_id)
    );
    
    if (matchingNGO) {
      if (matchingNGO.ngo_banner_image) {
        console.log(`Found matching NGO ${ngo.ngo_name} with banner image from API`);
        return matchingNGO.ngo_banner_image;
      }
      if (matchingNGO.bannerImage) {
        console.log(`Found matching NGO ${ngo.ngo_name} with bannerImage from API`);
        return matchingNGO.bannerImage;
      }
      if (matchingNGO.imageUrl) {
        console.log(`Found matching NGO ${ngo.ngo_name} with imageUrl from API`);
        return matchingNGO.imageUrl;
      }
    }
    
    // If we still don't have an image, use a fallback based on the NGO name
    // This ensures the same NGO always gets the same image
    const nameHash = ngo.ngo_name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const fallbackIndex = nameHash % FALLBACK_BANNER_IMAGES.length;
    console.log(`Using fallback image for ${ngo.ngo_name} at index ${fallbackIndex}`);
    return FALLBACK_BANNER_IMAGES[fallbackIndex];
  };

  const removeFromBasket = async (ngoId: string) => {
    try {
      const updatedBasket = basketItems.filter(item => item.id !== ngoId);
      setBasketItems(updatedBasket);
      await AsyncStorage.setItem('basketItems', JSON.stringify(updatedBasket));
    } catch (error) {
      console.error('Failed to remove item from basket:', error);
      Alert.alert('Error', 'Failed to remove item from basket');
    }
  };

  const navigateToNGODetail = (ngoId: string) => {
    navigation.navigate('NGODetailScreen', { ngoId });
  };



  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00BFA6" />
        <Text style={styles.loadingText}>Loading your basket...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Donation Box</Text>
        <View style={styles.placeholder} />
      </View>

      {basketItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image 
            source={require('../assets/basket.png')} 
            style={styles.emptyImage}
            resizeMode="contain"
          />
          <Text style={styles.emptyTitle}>Your donation box is empty</Text>
          <Text style={styles.emptyText}>
            Add NGOs to your donation box to keep track of organizations you're interested in supporting
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => navigation.navigate('NGOScreen')}
          >
            <Icon name="plus" size={16} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.browseButtonText}>Add NGO</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {basketItems.map((ngo) => {
              const bannerImageUrl = getBannerImage(ngo);
              console.log(`Rendering NGO ${ngo.ngo_name} with banner: ${bannerImageUrl}`);
              
              return (
                <View key={ngo.id} style={styles.ngoCard}>
                  <View style={styles.bannerContainer}>
                    <Image 
                      source={{ uri: bannerImageUrl }}
                      style={styles.bannerImage}
                      resizeMode="cover"
                    />
                  </View>
                  
                  <View style={styles.ngoCardContent}>
                    <Image
                      source={{ uri: ngo.ngo_profile_photo || 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741847678/samarthya_opy14x.jpg' }}
                      style={styles.ngoLogo}
                      resizeMode="cover"
                    />
                    <View style={styles.ngoInfo}>
                      <Text style={styles.ngoName}>{ngo.ngo_name}</Text>
                      
                      <View style={styles.categoryContainer}>
                        {ngo.ngo_category && ngo.ngo_category.length > 0 ? (
                          ngo.ngo_category.map((category, idx) => (
                            <View key={idx} style={styles.categoryTag}>
                              <Text style={styles.categoryText}>{category}</Text>
                            </View>
                          ))
                        ) : (
                          <View style={styles.categoryTag}>
                            <Text style={styles.categoryText}>NGO</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.cardActions}>
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => removeFromBasket(ngo.id)}
                    >
                      <MaterialIcons name="delete" size={22} color="#164860" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          
          <View style={styles.donateAllContainer}>
            <TouchableOpacity 
              style={styles.donateAllButton}
            >
              <Icon name="dollar" size={18} color="#fff" style={styles.donateIcon} />
              <Text style={styles.donateAllButtonText}>
                Proceed to Donate 
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    color: '#64748B',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#164860',
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    padding: 5,
  },
  placeholder: {
    width: 30,
  },
  scrollView: {
    flex: 1,
    padding: 15,
    paddingBottom: 100, // Increase padding to make room for the donate button
    backgroundColor: '#F8FAFC',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyImage: {
    width: 180,
    height: 180,
    marginBottom: 25,
    opacity: 0.9,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#164860',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  browseButton: {
    backgroundColor: '#00BFA6',
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#00BFA6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  browseButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  ngoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  bannerContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#f5f9ff',
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  ngoCardContent: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  ngoLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E6F2FF',
  },
  ngoInfo: {
    marginLeft: 15,
    flex: 1,
  },
  ngoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E3E5C',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  categoryTag: {
    backgroundColor: '#E6F2FF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E6F2FF',
  },
  categoryText: {
    fontSize: 11,
    color: '#0066CC',
    fontWeight: '500',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: 'white',
  },
  removeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6F2FF',
    width: '100%',
    height: 40,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  donateAllContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E6E6E6',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 999,
  },
  donateAllButton: {
    backgroundColor: '#00BFA6',
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00BFA6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  donateAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  donateIcon: {
    marginRight: 10,
  },
});

export default BasketScreen; 