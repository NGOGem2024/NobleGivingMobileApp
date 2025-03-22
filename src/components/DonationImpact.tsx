import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface ImpactCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

const impactCards: ImpactCard[] = [
  {
    id: '1',
    title: 'Giving Hope to Those in Need',
    description: 'Your donation helps children and families facing tough challenges build a brighter future.',
    icon: 'users',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Healing Hearts, Changing Lives',
    description: 'Your donation mends hearts, restores hope, and creates lasting change for those in need.',
    icon: 'heart',
    image: 'https://images.unsplash.com/photo-1469571486292-b53926c9bf6c?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Your Support is a Bridge',
    description: 'Your donation helps those in need move from hardship to healing with essential resources.',
    icon: 'home',
    image: 'https://images.unsplash.com/photo-1594708767771-a5e9d3c6284f?q=80&w=500&auto=format&fit=crop',
  },
];

const ImpactCard = ({ item }: { item: ImpactCard }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <Icon name={item.icon} size={20} color="#fff" />
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DonationImpact = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionLabel}>Your <Text style={styles.highlight}>Donation</Text></Text>
        <Text style={styles.sectionTitle}>Makes a Difference</Text>
      </View>
      
      <FlatList
        data={impactCards}
        renderItem={({ item }) => <ImpactCard item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#164860',
  },
  highlight: {
    color: '#0ee6b7',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#164860',
    marginTop: 4,
  },
  cardsContainer: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  card: {
    width: 280,
    borderRadius: 16,
    backgroundColor: 'white',
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 16,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#164860',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default DonationImpact; 