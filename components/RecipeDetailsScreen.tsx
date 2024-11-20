import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { rateRecipe } from '../services/api';
import { PLACEHOLDER_IMAGE } from '../shared/constants';
import { colors } from '../shared/customCSS';
import Rating from './Rating';

const RecipeDetailScreen = ({ route }) => {
    const { recipe: initialRecipe } = route.params;
    const [recipe, setRecipe] = useState(initialRecipe);

    const getImageSource = () => {
        if (recipe.imageUrl && recipe.imageUrl !== '') {
            return { uri: recipe.imageUrl };
        }
        return PLACEHOLDER_IMAGE;
    };

    const handleRate = async (rating: number) => {
        try {
            const response = await rateRecipe(recipe._id, rating);
            setRecipe(response);
        } catch (error) {
            console.error('Error rating recipe:', error);
            Alert.alert('Error', 'Failed to submit rating. Please try again.');
        }
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
        resizeMode: 'cover',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        justifyContent: 'flex-end',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 10,
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
        marginVertical: 10,
    },
    difficulty: {
        color: '#fff',
        fontSize: 14,
        textTransform: 'uppercase',
        fontFamily: 'Poppins-Regular',
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 15,
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