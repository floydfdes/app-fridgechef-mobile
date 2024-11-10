import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from 'react-native-vector-icons';
import { LinearGradient } from 'react-native-linear-gradient';
import React from 'react';

const RecipeCard = ({ recipe }) => (
    <TouchableOpacity>
        <View style={styles.card}>
            {/* Image of the recipe */}
            <Image source={{ uri: recipe.imageUrl || 'https://picsum.photos/700' }} style={styles.image} />

            {/* Gradient overlay */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{recipe.name}</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.cuisine}>{recipe.cuisine}</Text>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={16} color="#FFD700" /> {/* Gold star */}
                            <Text style={styles.rating}>{recipe.rating}</Text>
                        </View>
                    </View>
                    <Text style={styles.difficulty}>{recipe.difficulty}</Text>
                </View>
            </LinearGradient>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5, // For shadow on Android
        backgroundColor: '#fff', // Default white background
    },
    image: {
        width: '100%',
        height: 200,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        justifyContent: 'flex-end',
    },
    contentContainer: {
        padding: 15,
    },
    title: {
        fontWeight: 'bold', // Default bold
        fontSize: 18, // Adjust as needed
        color: '#fff', // White text
        marginBottom: 5,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    cuisine: {
        fontSize: 14, // Adjust as needed
        color: '#fff', // White text
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14, // Adjust as needed
        color: '#fff', // White text
        marginLeft: 5,
    },
    difficulty: {
        fontSize: 12, // Adjust as needed
        color: '#fff', // White text
        textTransform: 'uppercase',
    },
});

export default RecipeCard;
