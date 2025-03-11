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
    icon: 'search',
  },
  {
    id: '2',
    name: 'Healthcare',
    icon: 'search',
  },
  {
    id: '3',
    name: 'Disaster Relief',
    icon: 'search',
  },
  {
    id: '4',
    name: 'Animal Welfare',
    icon: 'search',
  },
];

const CategoryItem = ({ category }: { category: Category }) => {
  return (
    <TouchableOpacity style={styles.categoryItem}>
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const Categories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoriesContainer}>
        {/* {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))} */}
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
  categoryItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 0,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Categories;
