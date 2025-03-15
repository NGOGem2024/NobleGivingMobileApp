import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MultiSelect } from 'react-native-element-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import { apiService } from '../services/apiServices';

// App colors
const COLORS = {
  primary: '#164860',
  secondary: '#00BFA6',
  placeholder: '#8a9caa',
};

// Sample data based on the images
const CATEGORIES = [
  { id: '1', name: 'All', selected: true },
  { id: '2', name: 'Education', selected: false },
  { id: '3', name: 'Healthcare', selected: false },
  { id: '4', name: 'Disaster Relief', selected: false },
  { id: '5', name: 'Children', selected: false },
  { id: '6', name: 'Women Empowerment', selected: false },
];

// Search placeholder options that will cycle
const SEARCH_PLACEHOLDERS = [
  'Search by "NGO Name"',
  'Search by "NGO ID"',
];

// Fallback data in case API fails
const FALLBACK_NGO_DATA = [
  {
    id: '1',
    name: 'Samarthya Kalyankari Sanstha',
    rating: 4.5,
    city: 'Osmanabad, Maharashtra',
    state: 'Maharashtra',
    id_code: 'MH-2017-0164686',
    categories: ['Children'],
    verified: true,
    imageUrl: 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757240/samarthya-Kalyankari_quxzvw.webp'
  },
  {
    id: '2',
    name: 'Smile Organization',
    rating: 4.5,
    city: 'Ballari, Karnataka',
    state: 'Karnataka',
    id_code: 'KA-2012-0053121',
    categories: ['Children', 'Aged/Elderly'],
    verified: true,
    imageUrl: 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757239/smileorgamization_uhng2s.jpg' 
  },
  {
    id: '3',
    name: 'Spherule Foundation',
    rating: 4.5,
    city: 'Pune, Maharashtra',
    state: 'Maharashtra',
    id_code: 'MH-2017-0179219',
    categories: ['Women Development & Empowerment', 'Education & Literacy','Environment & Forests'],
    verified: true,
    imageUrl: 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757240/spherule_foundation_gxd44q.jpg' 
  },
  {
    id: '4',
    name: 'Jeevan Aadhar Society',
    rating: 4.5,
    city: 'Mahabubabad, Telangana',
    state: 'Telangana',
    id_code: 'TS-2019-0234853',
    categories: ['Women Development & Empowerment', 'Environment & Forests'],
    verified: true,
    imageUrl: 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757240/jeevan-adhaar-society_ljgi4x.jpg' 
  },
  {
    id: '5',
    name: 'SAHAYOG',
    rating: 4.5,
    // hashtag: '#leavenoonebehind',
    city: 'Khordha, Odisha',
    state: 'Odisha',
    id_code: 'OR-2012-0053976',
    categories: ['Rural Development & Poverty Alleviation', 'Health & Family Welfare'],
    verified: true,
    imageUrl: 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757240/Sahayog_phxron.jpg'
  },
  {
    id: '6',
    name: 'Snehashraya Foundation',
    rating: 4.5,
    city: 'Bangalore, Karnataka',
    state: 'Karnataka',
    id_code: 'KA-2018-0219857',
    categories: ['Education & Literacy', 'Health & Family Welfare'],
    verified: true,
    imageUrl: 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757240/snehasharaya-foundation_lm8iu9.jpg'
  },
  {
    id: '7',
    name: 'Centre for Social Responsibility and Leadership',
    rating: 4,
    city: 'Delhi, New Delhi',
    state: 'New Delhi',
    id_code: 'DL-2017-0118174',
    categories: ['Education & Literacy'],
    verified: true,
    imageUrl: 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757239/centreforsocial-responsibilty_zdauzd.webp'
  },
  
  
  {
    id: '8',
    name: 'Pagaria Welfare Foundation',
    rating: 4,
    city: 'Navi Mumbai, Maharashtra',
    state: 'Maharashtra',
    id_code: 'MH-2020-0251924',
    categories: ['Education & Literacy','Women Development & Empowerment','Rural Development & Poverty Alleviation', 'Children'],
    verified: true,
    imageUrl: 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757239/pagaria-welfare-foundation_dwk6hf.webp' 
  },
];

const NGOCard = ({ ngo }: { ngo: any }) => {
  const navigation = useNavigation();
  
  // Map API response fields to our UI
  const id = ngo._id || ngo.id || '';
  const name = ngo.ngo_name || ngo.name || 'Unknown NGO';
  const rating = ngo.rating || '4.0';
  const idCode = ngo.ngo_id || ngo.id_code || 'N/A';
  const categories = Array.isArray(ngo.ngo_category) 
    ? ngo.ngo_category 
    : (Array.isArray(ngo.categories) ? ngo.categories : ['General']);
  const city = ngo.ngo_city || ngo.city || 'Unknown Location';
  const state = ngo.ngo_state || ngo.state || '';
  const imageUrl = ngo.ngo_banner_image || ngo.bannerImage || ngo.imageUrl || 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741757240/samarthya-Kalyankari_quxzvw.webp';
  const verified = ngo.isSponsored !== undefined ? ngo.isSponsored : true;
  
  const handleNGOPress = () => {
    // Navigate to the NGO detail screen with the NGO ID
    // @ts-ignore - Ignoring type error for navigation
    navigation.navigate('NGODetailScreen', { ngoId: id });
  };

  return (
    <TouchableOpacity onPress={handleNGOPress} style={styles.cardTouchable}>
      <View style={styles.ngoCard}>
        <View style={styles.cardImageContainer}>
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.cardImage} 
          />
          {verified && (
            <Image 
              source={{ uri: 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741763259/verified-badge-removebg-preview_ekji2j.png' }}
              style={styles.verifiedBadge}
            />
          )}
        </View>
        
        <View style={styles.cardContent}>
          <Text style={styles.ngoName}>{name}</Text>
          
          <View style={styles.ratingContainer}>
            {Array(5).fill(0).map((_, i) => (
              <FontAwesome 
                key={i} 
                name={
                  i < Math.floor(parseFloat(rating))
                    ? "star"
                    : i === Math.floor(parseFloat(rating)) && parseFloat(rating) % 1 !== 0
                    ? "star-half-o"
                    : "star-o"
                } 
                size={14} 
                color={i < Math.ceil(parseFloat(rating)) ? "#164860" : "#BDBDBD"} 
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
          
          <Text style={styles.ngoId}>ID: {idCode}</Text>
          
          <View style={styles.categoryContainer}>
            {categories.map((category: string, index: number) => (
              <View key={index} style={styles.categoryTag}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.locationContainer}>
            <View style={styles.locationItem}>
              <Feather name="map-pin" size={12} color="#164860" style={{ marginRight: 2 }} />
              <Text style={[styles.locationText, styles.cityText]}>
                {city}{`, `}{state}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Custom placeholder component to render highlighted text
const renderPlaceholder = (placeholder: string) => {
  // Split the text by the quoted part
  const parts = placeholder.split(/"([^"]*)"/)
  
  if (parts.length === 3) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ color: COLORS.placeholder }}>{parts[0]}</Text>
        <Text style={{ 
          color: COLORS.placeholder,
          fontWeight: 'bold',
        }}>"{parts[1]}"</Text>
      </View>
    )
  }
  
  return <Text style={{ color: COLORS.placeholder }}>{placeholder}</Text>
}

// Animated pattern dot component
const PatternDot = ({ style }: { style: any }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  
  return (
    <Animated.View 
      style={[
        style, 
        { transform: [{ scale: scaleAnim }] }
      ]} 
    />
  );
};

const NGOScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState(CATEGORIES);
  const [showFilters, setShowFilters] = useState(false);
  const [ngoData, setNgoData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Add state for placeholder text
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [searchPlaceholder, setSearchPlaceholder] = useState(SEARCH_PLACEHOLDERS[0]);
  
  // Add state for dropdown menus
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  // Add state for selected values
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedSort, setSelectedSort] = useState('Rating');
  
  // Replace single category selection with multi-select
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // Add state to control category dropdown visibility
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
  // Extract unique states, cities, and categories from NGO data
  const states = ['All States', ...Array.from(new Set(ngoData.map(ngo => ngo.ngo_state || ngo.state || '').filter(Boolean)))];
  const cities = ['All Cities', ...Array.from(new Set(ngoData.map(ngo => ngo.ngo_city || ngo.city || '').filter(Boolean)))];
  
  // Get all unique categories from NGO data and format for dropdown
  const allCategoriesData = ngoData.reduce((acc: {label: string, value: string}[], ngo) => {
    const ngoCategories = ngo.ngo_category || ngo.categories || [];
    if (Array.isArray(ngoCategories)) {
      ngoCategories.forEach(category => {
        if (!acc.some(item => item.value === category)) {
          acc.push({ label: category, value: category });
        }
      });
    }
    return acc;
  }, []);
  
  // Sort options - explicitly set Rating first, Name second
  const sortOptions = ['Rating', 'Name'];
  
  // Add animation value for filter button
  const filterButtonScale = useRef(new Animated.Value(1)).current;
  
  // Add animation for title icon
  const titleIconAnim = useRef(new Animated.Value(1)).current;
  
  // Animate title icon on component mount
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(titleIconAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(titleIconAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    fetchNGOs();
  }, []);
  
  // Add useEffect for cycling placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % SEARCH_PLACEHOLDERS.length;
        setSearchPlaceholder(SEARCH_PLACEHOLDERS[newIndex]);
        return newIndex;
      });
    }, 4500); // Change placeholder every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  const fetchNGOs = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllNGOs();
      
      // The API returns an object with a 'ngos' array
      if (response && response.ngos && Array.isArray(response.ngos)) {
        console.log('Successfully fetched NGOs:', response.ngos.length);
        
        // Filter out NGOs with specific IDs
        const excludedIds = [
          "66f12cd7711393252365ee35",
          "6744205794062f70be27a009",
          "66f113b6711393252365ee33"
        ];
        
        const filteredNgos = response.ngos.filter((ngo: any) => 
          !excludedIds.includes(ngo._id)
        );
        
        setNgoData(filteredNgos);
        setError(null);
      } else {
        console.error('API response does not contain ngos array:', response);
        setError('Invalid API response format. Using fallback data.');
        setNgoData(FALLBACK_NGO_DATA);
      }
    } catch (err) {
      console.error('Failed to fetch NGOs:', err);
      setError('Failed to load NGOs. Using fallback data.');
      setNgoData(FALLBACK_NGO_DATA);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (id: string) => {
    setCategories(
      categories.map(cat => ({
        ...cat,
        selected: cat.id === id ? true : false
      }))
    );
  };

  // Calculate active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedState !== 'All States') count++;
    if (selectedCity !== 'All Cities') count++;
    count += selectedCategories.length;
    return count;
  };

  // Toggle filters with animation
  const toggleFilters = () => {
    // Animate button press
    Animated.sequence([
      Animated.timing(filterButtonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(filterButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Toggle filters state
    setShowFilters(!showFilters);
  };
  
  // Toggle dropdown visibility functions
  const toggleStateDropdown = () => {
    setShowStateDropdown(!showStateDropdown);
    setShowCityDropdown(false);
    setShowSortDropdown(false);
  };
  
  const toggleCityDropdown = () => {
    setShowCityDropdown(!showCityDropdown);
    setShowStateDropdown(false);
    setShowSortDropdown(false);
  };
  
  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
    setShowStateDropdown(false);
    setShowCityDropdown(false);
  };
  
  // Toggle category dropdown visibility
  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
    setShowStateDropdown(false);
    setShowCityDropdown(false);
    setShowSortDropdown(false);
  };
  
  // Selection handlers
  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setShowStateDropdown(false);
  };
  
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowCityDropdown(false);
  };
  
  const handleSortSelect = (sort: string) => {
    setSelectedSort(sort);
    setShowSortDropdown(false);
  };
  
  // Handle category selection - add to selected categories and close dropdown
  const handleCategorySelect = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
    setShowCategoryDropdown(false);
  };
  
  // Dropdown menu component
  const DropdownMenu = ({ 
    options, 
    onSelect, 
    visible,
    onClose
  }: { 
    options: string[], 
    onSelect: (option: string) => void, 
    visible: boolean,
    onClose: () => void
  }) => {
    if (!visible) return null;
    
    return (
      <>
        <TouchableOpacity 
          style={styles.dropdownBackdrop} 
          onPress={onClose}
          activeOpacity={1}
        />
        <View style={styles.dropdownMenu}>
          <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled={true}>
            {options.map((option, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.dropdownItem}
                onPress={() => onSelect(option)}
              >
                <Text style={styles.dropdownItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </>
    );
  };

  // Clear all selected categories
  const clearAllCategories = () => {
    setSelectedCategories([]);
  };
  
  // Get filtered categories for dropdown (exclude already selected ones)
  const getFilteredCategories = () => {
    return allCategoriesData
      .filter(item => !selectedCategories.includes(item.value))
      .map(item => item.value);
  };
  
  // Render selected category tags
  const renderSelectedCategories = () => {
    return (
      <View style={styles.selectedCategoriesContainer}>
        {selectedCategories.map((category, index) => (
          <View key={index} style={styles.selectedItem}>
            <Text style={styles.selectedItemText}>{category}</Text>
            <TouchableOpacity onPress={() => {
              const newCategories = [...selectedCategories];
              newCategories.splice(index, 1);
              setSelectedCategories(newCategories);
            }}>
              <AntDesign name="close" size={14} color="#164860" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };
  
  // Add a function to filter NGOs based on selected filters
  const getFilteredNGOs = () => {
    return ngoData.filter(ngo => {
      const ngoState = ngo.ngo_state || ngo.state || '';
      const ngoCity = ngo.ngo_city || ngo.city || '';
      const ngoCategories = ngo.ngo_category || ngo.categories || [];
      const ngoName = ngo.ngo_name || ngo.name || '';
      const ngoId = ngo.ngo_id || ngo.id_code || '';
      
      // Filter by state
      if (selectedState !== 'All States' && ngoState !== selectedState) {
        return false;
      }
      
      // Filter by city
      if (selectedCity !== 'All Cities' && ngoCity !== selectedCity) {
        return false;
      }
      
      // Filter by categories (multi-select)
      if (selectedCategories.length > 0) {
        // Check if the NGO has at least one of the selected categories
        const hasSelectedCategory = selectedCategories.some(selectedCat => 
          Array.isArray(ngoCategories) && ngoCategories.includes(selectedCat)
        );
        if (!hasSelectedCategory) {
          return false;
        }
      }
      
      // Filter by search text
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        // Search in both name and ID fields
        if (!ngoName.toLowerCase().includes(searchLower) && 
            !ngoId.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      
      return true;
    }).sort((a, b) => {
      // Sort by selected sort option
      if (selectedSort === 'Rating') {
        const ratingA = parseFloat(a.rating || '0');
        const ratingB = parseFloat(b.rating || '0');
        return ratingB - ratingA; // Sort by rating (descending)
      } else if (selectedSort === 'Name') {
        const nameA = (a.ngo_name || a.name || '').toLowerCase();
        const nameB = (b.ngo_name || b.name || '').toLowerCase();
        return nameA.localeCompare(nameB); // Sort by name (ascending)
      }
      return 0;
    });
  };

  // Handle map button press
  const handleMapPress = () => {
    // Navigate to map screen with filtered NGOs data
    // @ts-ignore - Ignoring type error for navigation
    navigation.navigate('MapScreen', { 
      ngos: getFilteredNGOs(),
      title: 'NGO Locations'
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.titleRow}>
          <View style={styles.patternOverlay}>
            {/* Create a pattern with multiple dots */}
            {Array(10).fill(0).map((_, i) => (
              <PatternDot key={i} style={[styles.patternDot, { 
                top: Math.random() * 100, 
                left: Math.random() * 100,
                width: 8 + Math.random() * 12,
                height: 8 + Math.random() * 12,
                opacity: 0.1 + Math.random() * 0.3
              }]} />
            ))}
          </View>
          <View style={styles.titleContainer}>
            <View style={styles.titleWithIcon}>
              <Animated.View style={[styles.titleIcon, { transform: [{ scale: titleIconAnim }] }]}>
                <Feather name="heart" size={20} color="#00BFA6" />
              </Animated.View>
              <Text style={styles.title}>NGO Partners</Text>
            </View>
            <Text style={styles.subtitle}>Find and support verified organizations</Text>
          </View>
          <Animated.View style={{ transform: [{ scale: filterButtonScale }] }}>
            <TouchableOpacity 
              style={[
                styles.filterButton, 
                showFilters && styles.filterButtonActive
              ]} 
              onPress={toggleFilters}
            >
              <Feather name="filter" size={18} color={showFilters ? '#fff' : '#164860'} />
              {getActiveFilterCount() > 0 && (
                <View style={styles.filterBadge}>
                  <Text style={styles.filterBadgeText}>{getActiveFilterCount()}</Text>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
        
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <LinearGradient
              colors={['#f8f9fa', '#ffffff']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.searchGradient}
            >
              <Feather name="search" size={20} color={COLORS.primary} style={styles.searchIcon} />
              <View style={{ flex: 1, position: 'relative' }}>
                {searchText === '' && (
                  <View style={styles.placeholderContainer} pointerEvents="none">
                    {renderPlaceholder(searchPlaceholder)}
                  </View>
                )}
                <TextInput
                  style={styles.searchInput}
                  placeholder=""
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>
            </LinearGradient>
          </View>
          
          <TouchableOpacity style={styles.mapButton} onPress={handleMapPress}>
            <Feather name="map-pin" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {showFilters && (
          <View style={styles.filterContainer}>
            <View style={styles.filterRow}>
              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>State</Text>
                <View style={{ position: 'relative' }}>
                  <TouchableOpacity style={styles.dropdownButton} onPress={toggleStateDropdown}>
                    <Text style={styles.dropdownText}>{selectedState}</Text>
                    <MaterialCommunityIcons name="chevron-down" size={14} color="#164860" />
                  </TouchableOpacity>
                  <DropdownMenu 
                    options={states} 
                    onSelect={handleStateSelect} 
                    visible={showStateDropdown}
                    onClose={() => setShowStateDropdown(false)}
                  />
                </View>
              </View>
              
              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>City</Text>
                <View style={{ position: 'relative' }}>
                  <TouchableOpacity style={styles.dropdownButton} onPress={toggleCityDropdown}>
                    <Text style={styles.dropdownText}>{selectedCity}</Text>
                    <MaterialCommunityIcons name="chevron-down" size={14} color="#164860" />
                  </TouchableOpacity>
                  <DropdownMenu 
                    options={cities} 
                    onSelect={handleCitySelect} 
                    visible={showCityDropdown}
                    onClose={() => setShowCityDropdown(false)}
                  />
                </View>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.filterRow}>
              <View style={styles.filterItem}>
                <View style={styles.categoryLabelRow}>
                  <Text style={styles.filterLabel}>Categories</Text>
                  {selectedCategories.length > 0 && (
                    <TouchableOpacity onPress={clearAllCategories}>
                      <Text style={styles.clearAllText}>Clear All</Text>
                    </TouchableOpacity>
                  )}
                </View>
                
                <View style={{ position: 'relative' }}>
                  <TouchableOpacity 
                    style={[styles.dropdownButton, styles.categoryDropdownButton]} 
                    onPress={toggleCategoryDropdown}
                  >
                    <Text style={styles.dropdownText}>
                      {selectedCategories.length > 0 
                        ? `${selectedCategories.length} selected` 
                        : 'Select categories'}
                    </Text>
                    <MaterialCommunityIcons name="chevron-down" size={14} color="#164860" />
                  </TouchableOpacity>
                  
                  <DropdownMenu 
                    options={getFilteredCategories()} 
                    onSelect={handleCategorySelect} 
                    visible={showCategoryDropdown}
                    onClose={() => setShowCategoryDropdown(false)}
                  />
                </View>
                
                {selectedCategories.length > 0 && renderSelectedCategories()}
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.filterRow}>
              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>Sort by</Text>
                <View style={{ position: 'relative' }}>
                  <TouchableOpacity style={styles.dropdownButton} onPress={toggleSortDropdown}>
                    <Text style={styles.dropdownText}>{selectedSort}</Text>
                    <MaterialCommunityIcons name="chevron-down" size={14} color="#164860" />
                  </TouchableOpacity>
                  <DropdownMenu 
                    options={sortOptions} // Options will be displayed in the order: Rating, Name
                    onSelect={handleSortSelect} 
                    visible={showSortDropdown}
                    onClose={() => setShowSortDropdown(false)}
                  />
                </View>
              </View>
            </View>
            
          </View>
        )}
        
        <View style={styles.featuredContainer}>
          <View style={styles.modernSectionTitleContainer}>
            <View style={styles.sectionTitleAccent} />
            <Text style={styles.sectionTitle}>Featured NGOs</Text>
          </View>
          
          <View style={styles.featuredCard}>
            <Image 
              source={{ uri: 'https://picsum.photos/400/200' }} 
              style={styles.featuredImage} 
            />
            
            <View style={styles.featuredOverlay}>
              <Text style={styles.featuredTitle}>COVID-19 Relief Fund</Text>
              <Text style={styles.featuredDescription}>
                Help provide medical supplies and support to those affected by COVID-19
              </Text>
              
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressIndicator, { width: '75%' }]} />
                </View>
                <View style={styles.progressStats}>
                  <Text style={styles.progressText}>₹8,50,000 raised</Text>
                  <Text style={styles.progressText}>₹10,00,000</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.allNGOsContainer}>
          <View style={styles.modernSectionTitleContainer}>
            <View style={styles.sectionTitleAccent} />
            <Text style={styles.sectionTitle}>All NGOs</Text>
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#164860" />
              <Text style={styles.loadingText}>Loading NGOs...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : ngoData.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No NGOs found</Text>
            </View>
          ) : (
            <>
              {(() => {
                try {
                  const filteredNGOs = getFilteredNGOs();
                  
                  if (filteredNGOs.length === 0) {
                    return (
                      <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No NGOs match your filters</Text>
                      </View>
                    );
                  }
                  
                  return filteredNGOs.map(ngo => (
                    <NGOCard key={ngo._id || ngo.id || Math.random().toString()} ngo={ngo} />
                  ));
                } catch (err) {
                  console.error('Error rendering NGO cards:', err);
                  return (
                    <View style={styles.errorContainer}>
                      <Text style={styles.errorText}>Error displaying NGOs. Please try again.</Text>
                    </View>
                  );
                }
              })()}
            </>
          )}
        </View>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f7ff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f0f7ff',
    borderRadius: 16,
    padding: 16,
    shadowColor: 'rgba(22, 72, 96, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e6f0f6',
    borderLeftWidth: 4,
    borderLeftColor: '#00BFA6',
    borderBottomWidth: 2,
    borderBottomColor: '#e6f0f6',
    position: 'relative',
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'column',
    zIndex: 1,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#164860',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  filterButton: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#f0f7ff',
    borderWidth: 1,
    borderColor: '#e6f0f6',
    shadowColor: 'rgba(22, 72, 96, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 50,
    flex: 1,
    marginRight: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e6f0f6',
    overflow: 'hidden',
  },
  searchGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
  },
  searchIcon: {
    padding: 5,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: '500',
  },
  featuredContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#164860',
    letterSpacing: 0.5,
  },
  featuredCard: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    shadowColor: 'rgba(22, 72, 96, 0.15)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e6f0f6',
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  featuredOverlay: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#164860',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: '#00BFA6',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  allNGOsContainer: {
    marginBottom: 20,
  },
  cardTouchable: {
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: 'rgba(22, 72, 96, 0.15)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  ngoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e6f0f6',
  },
  cardImageContainer: {
    position: 'relative',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 42,
    height: 42,
    resizeMode: 'contain'
  },
  cardContent: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  ngoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#164860',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  ngoId: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  categoryTag: {
    backgroundColor: '#f0f8ff',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#e6f2ff',
  },
  categoryText: {
    fontSize: 11,
    color: '#164860',
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
  },
  cityText: {
    fontWeight: 'bold',
    color: '#164860',
  },
  topFilterSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  topFilterOptions: {
    gap: 8,
  },
  topFilterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  topFilterItem: {
    flex: 1,
  },
  topFilterLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  topDropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  mapButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  filterContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    // elevation: 2,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  filterLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropdownText: {
    fontSize: 12,
    color: '#333',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(230, 240, 246, 0.8)',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 238, 238, 0.7)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(204, 0, 0, 0.1)',
  },
  errorText: {
    color: '#cc0000',
    fontSize: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(230, 240, 246, 0.8)',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
  // Add dropdown menu styles
  dropdownBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  // Add multi-select dropdown styles
  categoryLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  clearAllText: {
    fontSize: 12,
    color: '#00BFA6',
    fontWeight: '500',
    paddingHorizontal: 5,
  },
  multiSelectDropdown: {
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 40,
  },
  multiSelectIcon: {
    marginRight: 8,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: '#333',
    marginLeft: 5,
  },
  selectedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 3,
    marginRight: 8,
    backgroundColor: '#E6F2FF',
    borderRadius: 14,
  },
  selectedItemText: {
    fontSize: 12,
    color: '#164860',
    marginRight: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  categoryDropdownButton: {
    marginBottom: 8,
  },
  
  selectedCategoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  placeholderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
    paddingLeft: 0,
  },
  filterButtonActive: {
    backgroundColor: '#164860',
  },
  filterBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#cc0000',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  filterBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
    zIndex: 0,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#164860',
  },
  patternDot: {
    position: 'absolute',
    borderRadius: 20,
    backgroundColor: '#00BFA6',
  },
  modernSectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  sectionTitleAccent: {
    width: 4,
    height: 26,
    backgroundColor: '#00BFA6',
    borderRadius: 2,
    marginRight: 12,
    shadowColor: '#00BFA6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitleBadge: {
    backgroundColor: '#f0f7ff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#e6f0f6',
  },
  sectionTitleBadgeText: {
    fontSize: 12,
    color: '#164860',
    fontWeight: '500',
  },
});

export default NGOScreen;