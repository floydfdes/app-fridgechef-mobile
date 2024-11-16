import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RecipeCard = ({ recipe, navigation }) => (
    <TouchableOpacity onPress={() => navigation.navigate('RecipeDetailsScreen', { recipe })}>
        <View style={styles.card}>
            <Image source={{ uri: recipe.imageUrl || 'https://picsum.photos/700' }} style={styles.image} />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.gradient}>
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{recipe.name}</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.cuisine}>{recipe.cuisine}</Text>
                        <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={16} color="#FFD700" />
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
        elevation: 5,
        backgroundColor: '#fff',
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
        fontSize: 18,
        color: '#fff',
        marginBottom: 5,
        fontFamily: 'Poppins-Bold',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    cuisine: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 5,
        fontFamily: 'Poppins-Regular',
    },
    difficulty: {
        fontSize: 12,
        color: '#fff',
        textTransform: 'uppercase',
    },
});

export default RecipeCard;
