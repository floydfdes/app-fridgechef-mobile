import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { getRecipes } from '../../services/api';

interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
  cuisine: string;
  rating: number;
  category: string;
}

const categories = [
  { id: '1', name: 'Breakfast', key: 'breakfast' },
  { id: '2', name: 'Lunch', key: 'lunch' },
  { id: '3', name: 'Dinner', key: 'dinner' },
  { id: '4', name: 'Desserts', key: 'desserts' },
  { id: '5', name: 'Vegetarian', key: 'vegetarian' },
  { id: '6', name: 'Quick & Easy', key: 'quickAndEasy' },
];

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Define recipes as an array of Recipe objects
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await getRecipes();
        console.log('Fetched recipes:', recipesData);
        setRecipes(recipesData.recipes || []); // Ensure we're setting an array
      } catch (error) {
        console.error('Error fetching recipes:', error);
        Alert.alert('Error', 'Failed to load recipes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const renderCategory = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => setSelectedCategory(item.key)}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderRecipe = ({ item }: { item: Recipe }) => (
    <View style={styles.recipeCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeName}>{item.name}</Text>
        <Text style={styles.recipeCuisine}>{item.cuisine}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
    </View>
  );

  const filteredRecipes = selectedCategory
    ? recipes.filter(recipe => recipe.category === selectedCategory)
    : recipes;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Recipes</Text>
      {!selectedCategory ? (
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      ) : (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={styles.backButtonText}>Back to Categories</Text>
          </TouchableOpacity>
          {filteredRecipes.length > 0 ? (
            <FlatList
              data={filteredRecipes}
              renderItem={renderRecipe}
              keyExtractor={item => item.id.toString()}
            />
          ) : (
            <Text style={styles.noRecipesText}>No recipes found for this category.</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', // fallback background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  categoryItem: {
    flex: 1,
    margin: 10,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  backButton: {
    backgroundColor: '#6c63ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  backButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  recipeImage: {
    width: 100,
    height: 100,
  },
  recipeInfo: {
    flex: 1,
    padding: 10,
  },
  recipeName: {
    fontSize: 16,
    color: '#333',
  },
  recipeCuisine: {
    fontSize: 14,
    color: '#999',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
  },
  noRecipesText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Explore;
