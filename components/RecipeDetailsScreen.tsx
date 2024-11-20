import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { rateRecipe } from '../services/api';
import { PLACEHOLDER_IMAGE } from '../shared/constants';
import { colors } from '../shared/customCSS';
import Rating from './Rating';

const RecipeDetailScreen = ({ route, navigation }) => {
    const { recipe: initialRecipe } = route.params;
    const [recipe, setRecipe] = useState(initialRecipe);
    const [isMenuVisible, setMenuVisible] = useState(false);

    const getImageSource = () => {
        if (recipe.imageUrl && recipe.imageUrl !== '') {
            return { uri: recipe.imageUrl };
        }
        return PLACEHOLDER_IMAGE;
    };

    const handleRate = async (rating) => {
        try {
            const response = await rateRecipe(recipe._id, rating);
            setRecipe(response);
        } catch (error) {
            console.error('Error rating recipe:', error);
            Alert.alert('Error', 'Failed to submit rating. Please try again.');
        }
    };

    const handleEdit = () => {
        setMenuVisible(false);
        navigation.navigate('EditRecipeScreen', { recipe });
    };

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={getImageSource()}
                    style={styles.image}
                    defaultSource={PLACEHOLDER_IMAGE}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.gradient}
                >
                    <Text style={styles.title}>{recipe.name}</Text>
                    <View style={styles.headerInfo}>
                        <Text style={styles.cuisine}>{recipe.cuisine}</Text>
                        <View style={styles.ratingContainer}>
                            <Rating
                                rating={recipe.rating || 0}
                                onRate={handleRate}
                                size={16}
                                readonly={false}
                            />
                        </View>
                        <Text style={styles.difficulty}>{recipe.difficulty}</Text>
                    </View>
                </LinearGradient>
                <TouchableOpacity onPress={toggleMenu} style={styles.moreButton}>
                    <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
                </TouchableOpacity>
                {isMenuVisible && (
                    <View style={styles.dropdownMenu}>
                        <TouchableOpacity onPress={handleEdit} style={styles.menuItem}>
                            <Text style={styles.menuItemText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} disabled>
                            <Text style={styles.menuItemText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ingredients</Text>
                {recipe.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                        <Text style={styles.ingredientName}>{ingredient.name}</Text>
                        <Text style={styles.ingredientAmount}>{ingredient.amount}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Instructions</Text>
                <Text style={styles.instructions}>{recipe.instructions}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.third,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        padding: 10,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontFamily: 'Poppins-Bold',
    },
    headerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cuisine: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    difficulty: {
        color: '#fff',
        fontSize: 14,
        textTransform: 'uppercase',
        fontFamily: 'Poppins-Regular',
    },
    moreButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        borderRadius: 20,
        padding: 5,
    },
    dropdownMenu: {
        position: 'absolute',
        top: 40, // Adjust this value to position the menu below the button
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 5, // Add shadow for better visibility
        zIndex: 1000, // Ensure it appears above other elements
    },
    menuItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    menuItemText: {
        fontSize: 16,
        color: colors.primary,
        fontFamily: 'Poppins-Regular',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 10,
        color: colors.primary,
        fontFamily: 'Poppins-Bold',
    },
    ingredientItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    ingredientName: {
        fontSize: 16,
        color: colors.secondary,
        fontFamily: 'Poppins-Regular',
    },
    ingredientAmount: {
        fontSize: 16,
        color: colors.primary,
        fontFamily: 'Poppins-Regular',
    },
    instructions: {
        fontSize: 16,
        lineHeight: 24,
        color: colors.secondary,
        fontFamily: 'Poppins-Regular',
    },
});

export default RecipeDetailScreen;