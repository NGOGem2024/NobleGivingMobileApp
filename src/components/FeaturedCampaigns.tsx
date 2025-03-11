import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

interface Campaign {
  id: string;
  title: string;
  image: string;
  raised: number;
  goal: number;
  currency: string;
  organization: string; // Added organization field
}

const campaigns: Campaign[] = [
  {
    id: '1',
    title: 'Help Children Education',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=500&auto=format&fit=crop',
    raised: 70000,
    goal: 100000,
    currency: '₹',
    organization: 'Education First',
  },
  {
    id: '2',
    title: 'Help Children Healthcare',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=500&auto=format&fit=crop',
    raised: 70000,
    goal: 100000,
    currency: '₹',
    organization: 'Health For All',
  },
  {
    id: '3',
    title: 'Clean Water Project',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=500&auto=format&fit=crop',
    raised: 70000,
    goal: 80000,
    currency: '₹',
    organization: 'Water Relief',
  },
];

const CampaignCard = ({ campaign }: { campaign: Campaign }) => {
  const progress = (campaign.raised / campaign.goal) * 100;
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: campaign.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{campaign.title}</Text>
        <Text style={styles.organizationName}>by {campaign.organization}</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <View style={styles.raisedContainer}>
          <Text style={styles.raisedText}>
            {campaign.currency}{campaign.raised.toLocaleString()} raised
          </Text>
          <Text style={styles.goalText}>
            of {campaign.currency}{campaign.goal.toLocaleString()}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.donateButton}>
            <Text style={styles.donateButtonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.basketButton}>
            <Text style={styles.basketButtonText}>Add to Basket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FeaturedCampaigns = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Featured Campaigns</Text>
      <FlatList
        data={campaigns}
        renderItem={({ item }) => <CampaignCard campaign={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  card: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  image: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  organizationName: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginVertical: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#164860',
    borderRadius: 4,
  },
  raisedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  raisedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  goalText: {
    fontSize: 14,
    color: '#777',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  donateButton: {
    backgroundColor: '#164860',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    marginRight: 6,
  },
  donateButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  basketButton: {
    backgroundColor: 'white',
    // paddingHorizontal: 19,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#164860',
    flex: 1,
    textAlign: 'center',
    marginLeft: 6,
  },
  basketButtonText: {
    color: '#164860',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default FeaturedCampaigns;