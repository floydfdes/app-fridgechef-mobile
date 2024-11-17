import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RecipeCard from '../../components/RecipeCard';
import SearchBar from '../../components/SearchBar';
import { getRecipes, getRecipesByIngredients } from '../../services/api';
import { colors } from '../../shared/customCSS';
import { Recipe } from '../../shared/types';

const MyRecipes = ({ navigation }) => {
    const [myRecipes, setMyRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);

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

    const handleSearch = async (ingredients: string[]) => {
        try {
            setIsSearching(true);
            setError(null);
            const userId = await AsyncStorage.getItem('userId');

            if (!userId) {
                navigation.navigate('Login');
                return;
            }

            if (ingredients.length === 0) {
                // If search is cleared, fetch all recipes
                await fetchRecipes();
                return;
            }

            const response = await getRecipesByIngredients({ ingredients });
            // Filter for user's recipes from search results
            const userSearchResults = response.recipes.filter(
                (recipe: Recipe) => recipe.createdBy === userId
            );
            setMyRecipes(userSearchResults);
        } catch (error) {
            console.error('Error searching recipes:', error);
            setError('Failed to search recipes. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const renderContent = () => {
        if (loading || isSearching) {
            return (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={fetchRecipes}
                    >
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        if (myRecipes.length === 0) {
            return (
                <View style={styles.centerContainer}>
                    <Text style={styles.noRecipesText}>No recipes found</Text>
                    <Text style={styles.subText}>
                        {isSearching
                            ? 'Try different ingredients'
                            : 'Start adding your favorite recipes!'
                        }
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.recipeList}>
                {myRecipes.map((recipe) => (
                    <RecipeCard
                        key={recipe._id?.toString() || `my-${recipe.name}`}
                        recipe={recipe}
                        navigation={navigation}
                    />
                ))}
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.sectionTitle}>My Recipes</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddRecipeScreen')}
                >
                    <FontAwesome name="plus" size={20} color="#fff" />
                    <Text style={styles.addButtonText}>Add Recipe</Text>
                </TouchableOpacity>
            </View>

            <SearchBar onSearch={handleSearch} />

            {renderContent()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.third,
        paddingHorizontal: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    sectionTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24,
        color: colors.primary,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        elevation: 2,
    },
    addButtonText: {
        color: '#fff',
        marginLeft: 8,
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },
    recipeList: {
        marginBottom: 20,
    },
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    errorText: {
        color: 'red',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    retryButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 10,
    },
    retryButtonText: {
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },
    noRecipesText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        color: colors.secondary,
        marginBottom: 8,
    },
    subText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: colors.secondary,
        textAlign: 'center',
    },
});

export default MyRecipes;
