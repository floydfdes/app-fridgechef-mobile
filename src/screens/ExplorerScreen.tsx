import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import RecipeCard from '../../components/RecipeCard';
import { getRecipes } from '../../services/api';
import { RECIPE_CATEGORIES } from '../../shared/constants';
import { colors } from '../../shared/customCSS';
import { Recipe } from '../../shared/types';

const Explore = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await getRecipes();
        setRecipes(recipesData.recipes || []);
      } catch (error) {
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

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => setSelectedCategory(item.key)}
    >
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );
  const filteredRecipes = selectedCategory
    ? recipes.filter(recipe => recipe.category === selectedCategory)
    : recipes;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Recipes</Text>
      {!selectedCategory ? (
        <FlatList
          data={RECIPE_CATEGORIES}
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
              renderItem={({ item }) => <RecipeCard recipe={item} navigation={navigation} />}
              keyExtractor={item => item._id.toString()}
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
    backgroundColor: colors.third,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    fontFamily: 'Poppins-Bold',
  },
  categoryItem: {
    flex: 1,
    margin: 10,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    elevation: 3,
    padding: 10,
  },
  categoryText: {
    fontSize: 16,
    color: colors.third,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    maxWidth: '80%',
  },
  backButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  backButtonText: {
    color: colors.third,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  noRecipesText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Explore;
