import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import RecipeCard from '../../components/RecipeCard';
import { getRecipes } from '../../services/api';
import { Recipe } from '../../shared/types';

const MyRecipes = ({ navigation }) => {
    const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            setError(null);
            const userId = await AsyncStorage.getItem('userId');

            if (!userId) {
                navigation.navigate('Login');
                return;
            }

            const recipesData = await getRecipes();
            const userRecipes = recipesData.recipes.filter(
                (recipe: Recipe) => recipe.createdBy === userId
            );
            setMyRecipes(userRecipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setError('Failed to load recipes. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>My Recipes</Text>
            <View style={styles.recipeList}>
                {myRecipes.map((recipe) => (
                    <RecipeCard key={recipe._id?.toString() || `my-${recipe.name}`} recipe={recipe} navigation={navigation} />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        marginVertical: 10,
    },
    recipeList: {
        marginBottom: 20,
    },
    recipeCard: {
        flexDirection: 'row',
        backgroundColor: '#f3f3f3',
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
        color: '#666',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    ratingText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 5,
    },
    addButton: {
        backgroundColor: '#6c63ff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignSelf: 'center',
        marginVertical: 20,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default MyRecipes;
