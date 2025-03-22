import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

interface Campaign {
  id: string;
  title: string;
  image: string;
  raised: number;
  goal: number;
  currency: string;
  organization: string;
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
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: campaign.image }} style={styles.image} />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
          style={styles.imageGradient}
        />
        <LinearGradient
          colors={['#FF7E5F', '#FF5858']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.featuredBadge}
        >
          <Text style={styles.featuredText}>Featured</Text>
        </LinearGradient>
        
        <View style={styles.campaignInfoOverlay}>
          <Text style={styles.overlayTitle}>{campaign.title}</Text>
          <Text style={styles.overlayOrg}>by {campaign.organization}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.progressSection}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarContainer}>
              <LinearGradient
                colors={['#1e5d78', '#164860']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={[styles.progressBar, { width: `${progress}%` }]}
              />
            </View>
            <View style={styles.percentageContainer}>
              <Text style={styles.percentageText}>{Math.round(progress)}%</Text>
            </View>
          </View>
          
          <View style={styles.raisedContainer}>
            <Text style={styles.raisedText}>
              {campaign.currency}{campaign.raised.toLocaleString()} raised
            </Text>
            <Text style={styles.goalText}>
              of {campaign.currency}{campaign.goal.toLocaleString()}
            </Text>
          </View>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.viewButtonContainer}>
            <LinearGradient
              colors={['#1e5d78', '#164860']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.viewButton}
            >
              <Text style={styles.viewButtonText}>View</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.basketButton}>
            <Text style={styles.basketButtonText}>Add to Basket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const FeaturedCampaigns = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(30, 93, 120, 0.03)', 'rgba(255, 255, 255, 0)']}
        style={styles.sectionGradient}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <View style={styles.sectionTitleContainer}>
              <LinearGradient
                colors={['rgba(30, 93, 120, 0.12)', 'rgba(30, 93, 120, 0.05)']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.titleBackground}
              >
                <Icon name="award" size={20} color="#1e5d78" style={styles.titleIcon} />
                <Text style={styles.sectionTitle}>Featured Campaigns</Text>
              </LinearGradient>
            </View>
          </View>
          <TouchableOpacity style={styles.viewAllContainer}>
            <Text style={styles.viewAll}>View All</Text>
            <Icon name="chevron-right" size={16} color="#1e5d78" style={styles.viewAllIcon} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={campaigns}
          renderItem={({ item }) => <CampaignCard campaign={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingLeft: 10,
  },
  sectionGradient: {
    borderRadius: 16,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 7,
    borderRadius: 8,
  },
  titleIcon: {
    marginRight: 3,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#1e5d78',
    letterSpacing: 0.3,
  },
  viewAllContainer: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: 'rgba(30, 93, 120, 0.08)',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e5d78',
  },
  viewAllIcon: {
    marginLeft: 2,
  },
  listContainer: {
    paddingRight: 16,
    paddingBottom: 8,
  },
  card: {
    width: 280,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 8,
    shadowColor: '#1e5d78',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: 'ffffff',
  },
  imageContainer: {
    position: 'relative',
    height: 170,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    elevation: 3,
    shadowColor: '#FF5858',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  featuredText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  campaignInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  overlayTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  overlayOrg: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardContent: {
    padding: 16,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  percentageContainer: {
    // marginLeft: 8,
    // backgroundColor: 'rgba(30, 93, 120, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e5d78',
  },
  raisedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  raisedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  goalText: {
    fontSize: 14,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButtonContainer: {
    flex: 1,
    marginRight: 6,
    borderRadius: 8,
    overflow: 'hidden',
    // elevation: 2,
    shadowColor: '#164860',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  viewButton: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.6,
  },
  basketButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1e5d78',
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 93, 120, 0.05)',
  },
  basketButtonText: {
    color: '#1e5d78',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.4,
  },
});

export default FeaturedCampaigns;