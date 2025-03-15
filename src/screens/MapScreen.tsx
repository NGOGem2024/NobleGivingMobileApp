import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

// Define interface for NGO location data
interface NgoLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  rating: string;
  categories: string[];
  city: string;
  state: string;
}

const MapScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [region, setRegion] = useState({
    latitude: 20.5937,  // Center of India
    longitude: 78.9629, // Center of India
    latitudeDelta: 20,
    longitudeDelta: 20,
  });
  
  // Get NGOs data from route params
  const { ngos = [], title = 'NGO Locations' } = (route.params as any) || {};
  
  // Process NGO data to extract locations
  const [ngoLocations, setNgoLocations] = useState<NgoLocation[]>([]);
  
  // Request location permissions
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location to show your position on the map.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission granted");
          setPermissionGranted(true);
        } else {
          console.log("Location permission denied");
          Alert.alert(
            "Permission Denied",
            "You need to grant location permission to see your position on the map."
          );
        }
      } else {
        // For iOS, permissions are handled by the Info.plist file
        setPermissionGranted(true);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    // Request location permission when component mounts
    requestLocationPermission();
    
    // Debug information
    console.log('MapScreen mounted');
    console.log('Platform:', Platform.OS);
    
    // Check if Google Maps API key is set
    if (Platform.OS === 'android') {
      try {
        console.log('Checking Google Maps API key...');
        
        // This is a simple check to see if the API key is still the placeholder
        const metaData = require('react-native').NativeModules.RNGoogleSignin?.METADATA;
        console.log('Metadata available:', !!metaData);
        
        if (metaData) {
          const apiKey = metaData['com.google.android.geo.API_KEY'];
          console.log('API Key found:', apiKey ? 'Yes (not showing for security)' : 'No');
          
          if (apiKey === 'YOUR_API_KEY_HERE') {
            console.warn('Google Maps API key is still set to the placeholder value. Maps will not work correctly.');
            Alert.alert(
              'API Key Not Set',
              'The Google Maps API key is not set correctly. Please replace "YOUR_API_KEY_HERE" with a valid API key in AndroidManifest.xml.'
            );
          }
        } else {
          console.log('Could not access metadata to check API key');
        }
      } catch (error) {
        console.log('Could not check Google Maps API key:', error);
      }
    }
    
    // Set a timeout to stop showing the loading indicator after a while
    // This helps in case the map fails to load but doesn't trigger an error
    const timer = setTimeout(() => {
      setLoading(false);
      console.log('Map loading timeout reached');
    }, 10000); // 10 seconds timeout
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Process NGO data to extract locations
    console.log('NGOs data received:', JSON.stringify(ngos));
    
    const locations: NgoLocation[] = ngos.map((ngo: any) => {
      // Try to get position from ngo data
      const position = ngo.ngo_position || ngo.position;
      console.log(`NGO ${ngo.ngo_name || ngo.name} position:`, position);
      
      // If position is available, use it
      if (position && Array.isArray(position) && position.length === 2) {
        return {
          id: ngo._id || ngo.id,
          name: ngo.ngo_name || ngo.name,
          latitude: position[0],
          longitude: position[1],
          rating: ngo.rating || '4.0',
          categories: ngo.ngo_category || ngo.categories || [],
          city: ngo.ngo_city || ngo.city || '',
          state: ngo.ngo_state || ngo.state || '',
        };
      }
      
      // If no position, try to use a default position based on city/state
      // This is a simplified approach - in a real app, you'd use geocoding
      return {
        id: ngo._id || ngo.id,
        name: ngo.ngo_name || ngo.name,
        // Default to a position in India if no location data
        latitude: 20.5937 + (Math.random() - 0.5) * 10, // Add some randomness
        longitude: 78.9629 + (Math.random() - 0.5) * 10, // Add some randomness
        rating: ngo.rating || '4.0',
        categories: ngo.ngo_category || ngo.categories || [],
        city: ngo.ngo_city || ngo.city || '',
        state: ngo.ngo_state || ngo.state || '',
      };
    });
    
    console.log('Processed locations:', locations.length);
    setNgoLocations(locations);
    setLoading(false);
    
    // If we have locations, adjust the map region to fit them
    if (locations.length > 0) {
      // Calculate the center of all markers
      const lats = locations.map((loc) => loc.latitude);
      const lngs = locations.map((loc) => loc.longitude);
      
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);
      
      const centerLat = (minLat + maxLat) / 2;
      const centerLng = (minLng + maxLng) / 2;
      
      // Calculate appropriate deltas to fit all markers
      const latDelta = (maxLat - minLat) * 1.5; // Add some padding
      const lngDelta = (maxLng - minLng) * 1.5; // Add some padding
      
      setRegion({
        latitude: centerLat,
        longitude: centerLng,
        latitudeDelta: Math.max(latDelta, 0.5), // Ensure minimum zoom
        longitudeDelta: Math.max(lngDelta, 0.5), // Ensure minimum zoom
      });
    }
  }, [ngos]);
  
  const handleMarkerPress = (ngoId: string) => {
    // Navigate to NGO detail screen
    // @ts-ignore - Ignoring type error for navigation
    navigation.navigate('NGODetailScreen', { ngoId });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#164860" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.placeholder} />
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#164860" />
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      ) : (
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            initialRegion={{
              latitude: 28.6139,  // New Delhi
              longitude: 77.2090, // New Delhi
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={permissionGranted}
            showsMyLocationButton={permissionGranted}
            onMapReady={() => {
              console.log('Map is ready');
              setLoading(false);
            }}
            onMapLoaded={() => {
              console.log('Map is loaded');
              setLoading(false);
            }}
          >
            {/* Fixed test marker */}
            <Marker
              coordinate={{
                latitude: 28.6139,
                longitude: 77.2090,
              }}
              title="Test Marker"
              description="This is a test marker to verify Google Maps is working"
            >
              <View style={styles.markerContainer}>
                <View style={styles.marker}>
                  <FontAwesome name="building" size={16} color="#164860" />
                </View>
              </View>
            </Marker>
            
            {/* Original markers */}
            {ngoLocations.length > 0 && ngoLocations.map((ngo) => (
              <Marker
                key={ngo.id}
                coordinate={{
                  latitude: ngo.latitude,
                  longitude: ngo.longitude,
                }}
                title={ngo.name}
                description={ngo.categories.join(', ')}
                onCalloutPress={() => handleMarkerPress(ngo.id)}
              >
                <View style={styles.markerContainer}>
                  <View style={styles.marker}>
                    <FontAwesome name="building" size={16} color="#164860" />
                  </View>
                </View>
                <Callout tooltip>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{ngo.name}</Text>
                    {ngo.categories.length > 0 && (
                      <Text style={styles.calloutCategories}>
                        {ngo.categories.slice(0, 2).join(', ')}
                        {ngo.categories.length > 2 ? '...' : ''}
                      </Text>
                    )}
                    <Text style={styles.calloutLocation}>
                      {ngo.city}{ngo.city && ngo.state ? ', ' : ''}{ngo.state}
                    </Text>
                    <View style={styles.calloutRating}>
                      {Array(5).fill(0).map((_, i) => (
                        <FontAwesome 
                          key={i} 
                          name={
                            i < Math.floor(parseFloat(ngo.rating))
                              ? "star"
                              : i === Math.floor(parseFloat(ngo.rating)) && parseFloat(ngo.rating) % 1 !== 0
                              ? "star-half-o"
                              : "star-o"
                          } 
                          size={12} 
                          color="#164860" 
                          style={{ marginRight: 2 }}
                        />
                      ))}
                    </View>
                    <Text style={styles.calloutTapText}>Tap for details</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#164860',
  },
  placeholder: {
    width: 40,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#164860',
  },
  calloutContainer: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#164860',
    marginBottom: 4,
  },
  calloutCategories: {
    fontSize: 12,
    color: '#00BFA6',
    marginBottom: 4,
  },
  calloutLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  calloutRating: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  calloutTapText: {
    fontSize: 10,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 4,
  },
  noLocationsText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#666',
    fontSize: 16,
  },
});

export default MapScreen; 