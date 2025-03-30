import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, useWindowDimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

interface ImpactCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  iconBackground?: string[];
}

const impactCards: ImpactCard[] = [
  {
    id: '1',
    title: 'Giving Hope to Those in Need',
    description: 'Your donation helps children and families facing tough challenges build a brighter future.',
    icon: 'users',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=500&auto=format&fit=crop',
    iconBackground: ['#164860', '#0c7489'],
  },
  {
    id: '2',
    title: 'Healing Hearts, Changing Lives',
    description: 'Your donation mends hearts, restores hope, and creates lasting change for those in need.',
    icon: 'heart',
    image: 'https://images.unsplash.com/photo-1469571486292-b53926c9bf6c?q=80&w=500&auto=format&fit=crop',
    iconBackground: ['#0ee6b7', '#0cb896'],
  },
  {
    id: '3',
    title: 'Your Support is a Bridge',
    description: 'Your donation helps those in need move from hardship to healing with essential resources.',
    icon: 'home',
    image: 'https://images.unsplash.com/photo-1594708767771-a5e9d3c6284f?q=80&w=500&auto=format&fit=crop',
    iconBackground: ['#164860', '#0c7489'],
  },
];

const ImpactCard = ({ item, index, width }: { item: ImpactCard; index: number; width: number }) => {
  // Calculate card width based on screen width (2 cards per row with spacing)
  const cardWidth = (width - 48) / 2;
  
  // For the center showcase card (bigger and full width)
  const isCenterCard = index === 1;
  const finalCardWidth = isCenterCard ? width - 32 : cardWidth;
  
  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        { 
          width: finalCardWidth,
          height: isCenterCard ? 220 : 180,
        }
      ]}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.overlay}
      />
      <View style={styles.cardContent}>
        <View style={[
          styles.iconContainer, 
          { 
            backgroundColor: item.iconBackground ? item.iconBackground[0] : '#164860',
          }
        ]}>
          <Icon name={item.icon} size={isCenterCard ? 22 : 18} color="#fff" />
        </View>
        <Text style={[styles.cardTitle, isCenterCard && styles.centerCardTitle]}>{item.title}</Text>
        <Text style={[styles.cardDescription, isCenterCard && styles.centerCardDescription]}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DonationImpact = () => {
  const { width } = useWindowDimensions();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionLabel}>Your <Text style={styles.highlight}>Donation</Text></Text>
        <Text style={styles.sectionTitle}>Makes a Difference</Text>
      </View>
      
      <View style={styles.cardsContainer}>
        {impactCards.map((item, index) => (
          <ImpactCard 
            key={item.id} 
            item={item} 
            index={index}
            width={width}
          />
        ))}
      </View>
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
    marginBottom: 24,
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
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    borderRadius: 16,
  },
  cardContent: {
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  centerCardTitle: {
    fontSize: 18,
  },
  cardDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  centerCardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default DonationImpact; 