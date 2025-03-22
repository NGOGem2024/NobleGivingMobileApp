import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Education',
    icon: 'book',
  },
  {
    id: '2',
    name: 'Healthcare',
    icon: 'heart',
  },
  {
    id: '3',
    name: 'Disaster Relief',
    icon: 'home',
  },
  {
    id: '4',
    name: 'Animal Welfare',
    icon: 'github',
  },
];

const CategoryItem = ({ category }: { category: Category }) => {
  return (
    <TouchableOpacity style={styles.categoryItem}>
      <Icon name={category.icon} size={24} color="#164860" style={styles.categoryIcon} />
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const Categories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={({ item }) => <CategoryItem category={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  listContainer: {
    paddingRight: 16,
  },
  categoryItem: {
    width: 120,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Categories;
