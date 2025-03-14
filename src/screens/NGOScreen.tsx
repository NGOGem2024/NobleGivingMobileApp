// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import Header from '../components/Header';

// const NGOScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Header />
//       <ScrollView style={styles.content}>
//         <Text style={styles.title}>NGO Partners</Text>
//         {/* NGO list will be added here */}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   content: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#164860',
//     marginBottom: 16,
//   },
// });

// export default NGOScreen; 


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';

// Sample data based on the images
const CATEGORIES = [
  { id: '1', name: 'All', selected: true },
  { id: '2', name: 'Education', selected: false },
  { id: '3', name: 'Healthcare', selected: false },
  { id: '4', name: 'Disaster Relief', selected: false },
  { id: '5', name: 'Children', selected: false },
  { id: '6', name: 'Women Empowerment', selected: false },
];

const NGO_DATA = [
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
  
  const handleNGOPress = () => {
    if (ngo.name === 'Samarthya Kalyankari Sanstha') {
      navigation.navigate('SamarthyaNGO' as never);
    }
  };

  return (
    <TouchableOpacity onPress={handleNGOPress}>
      <View style={styles.ngoCard}>
        <View style={styles.cardImageContainer}>
          <Image 
            source={{ uri: ngo.imageUrl }} 
            style={styles.cardImage} 
          />
          <Image 
            source={{ uri: 'https://res.cloudinary.com/dpyficcwm/image/upload/v1741763259/verified-badge-removebg-preview_ekji2j.png' }}
            style={styles.verifiedBadge}
          />
        </View>
        
        <View style={styles.cardContent}>
          <Text style={styles.ngoName}>{ngo.name}</Text>
          
          <View style={styles.ratingContainer}>
            {Array(5).fill(0).map((_, i) => (
              <FontAwesome 
                key={i} 
                name={
                  i < Math.floor(ngo.rating)
                    ? "star"
                    : i === Math.floor(ngo.rating) && ngo.rating % 1 !== 0
                    ? "star-half-o"
                    : "star-o"
                } 
                size={14} 
                color={i < Math.ceil(ngo.rating) ? "#164860" : "#BDBDBD"} 
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
          
          <Text style={styles.ngoId}>ID: {ngo.id_code}</Text>
          
          <View style={styles.categoryContainer}>
            {ngo.categories.map((category: string, index: number) => (
              <View key={index} style={styles.categoryTag}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.locationContainer}>
            <View style={styles.locationItem}>
              <Feather name="map-pin" size={12} color="#164860" style={{ marginRight: 2 }} />
              <Text style={[styles.locationText, styles.cityText]}>
                City: {ngo.city}
              </Text>
            </View>
            {/* <View style={styles.locationItem}>
              <Feather name="map-pin" size={12} color="#164860" style={{ marginRight: 2 }} />
              <Text style={[styles.locationText, styles.cityText]}>
                State: {ngo.state}
              </Text>
            </View> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const NGOScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState(CATEGORIES);
  const [showFilters, setShowFilters] = useState(false);
  
  const toggleCategory = (id: string) => {
    setCategories(
      categories.map(cat => ({
        ...cat,
        selected: cat.id === id ? true : false
      }))
    );
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <View style={styles.container}>
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>NGO Partners</Text>
          <TouchableOpacity 
            style={[
              styles.filterButton, 
              showFilters && { backgroundColor: '#164860' }
            ]} 
            onPress={toggleFilters}
          >
            <Feather name="filter" size={18} color={showFilters ? '#fff' : '#164860'} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search NGOs"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          
          <TouchableOpacity style={styles.mapButton}>
            <Feather name="map-pin" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {showFilters && (
          <View style={styles.filterContainer}>
            <View style={styles.filterRow}>
              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>State</Text>
                <TouchableOpacity style={styles.dropdownButton}>
                  <Text style={styles.dropdownText}>All States</Text>
                  <MaterialCommunityIcons name="chevron-down" size={14} color="#164860" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>City</Text>
                <TouchableOpacity style={styles.dropdownButton}>
                  <Text style={styles.dropdownText}>All Cities</Text>
                  <MaterialCommunityIcons name="chevron-down" size={14} color="#164860" />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.filterRow}>
              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>Categories</Text>
                <TouchableOpacity style={styles.dropdownButton}>
                  <Text style={styles.dropdownText}>All Categories</Text>
                  <MaterialCommunityIcons name="chevron-down" size={14} color="#164860" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.filterItem}>
                <Text style={styles.filterLabel}>Sort by</Text>
                <TouchableOpacity style={styles.dropdownButton}>
                  <Text style={styles.dropdownText}>Rating</Text>
                  <MaterialCommunityIcons name="chevron-down" size={14} color="#164860" />
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
        )}
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                category.selected ? styles.categoryButtonSelected : null
              ]}
              onPress={() => toggleCategory(category.id)}
            >
              <Text 
                style={[
                  styles.categoryButtonText,
                  category.selected ? styles.categoryButtonTextSelected : null
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <View style={styles.featuredContainer}>
          <Text style={styles.sectionTitle}>Featured NGOs</Text>
          
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
          <Text style={styles.sectionTitle}>All NGOs</Text>
          
          {NGO_DATA.map(ngo => (
            <NGOCard key={ngo.id} ngo={ngo} />
          ))}
        </View>
      </ScrollView>
      
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
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#164860',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#164860',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  categoriesScroll: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10,
  },
  categoryButtonSelected: {
    backgroundColor: '#164860',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#555',
  },
  categoryButtonTextSelected: {
    color: '#fff',
  },
  featuredContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  featuredCard: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  featuredOverlay: {
    padding: 16,
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
  ngoCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  cardImageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 160,
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
  },
  ngoName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#164860',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  ngoId: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  categoryTag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 11,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: '#164860',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  filterContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    // elevation: 2,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  filterItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  filterLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
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
});

export default NGOScreen;