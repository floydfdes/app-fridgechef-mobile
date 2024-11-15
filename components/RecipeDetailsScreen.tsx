import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../shared/customCSS';

const RecipeDetailScreen = ({ route }) => {
    const { recipe } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: recipe.imageUrl || 'https://picsum.photos/700' }}
                    style={styles.image}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.gradient}
                >
                    <Text style={styles.title}>{recipe.name}</Text>
                    <View style={styles.headerInfo}>
                        <Text style={styles.cuisine}>{recipe.cuisine}</Text>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Text style={styles.rating}>{recipe.rating}</Text>
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
        height: 300,
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
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
    },
    rating: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
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