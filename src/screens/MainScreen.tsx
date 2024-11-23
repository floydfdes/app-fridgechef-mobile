import React, { useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { launchCamera } from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { uploadFridgeImage } from '../../services/api';
import { Recipe } from '../../shared/types';

const Main = () => {
    const [fridgeImage, setFridgeImage] = useState("");
    const [suggestedRecipes, setSuggestedRecipes] = useState([]);

    const takeFridgePhoto = async () => {
        launchCamera(
            {
                mediaType: 'photo',
                cameraType: 'back',
                maxWidth: 1200,
                maxHeight: 800,
                quality: 1,
                includeBase64: false,
            },
            async (response) => {
                if (response.didCancel) {
                    console.log('User canceled image picker');
                } else if (response.errorMessage) {
                    console.error('Image Picker Error: ', response.errorMessage);
                    Alert.alert('Error', 'Failed to open camera. Please try again.');
                } else {
                    const uri = response.assets && response.assets[0].uri;
                    if (uri) {
                        const uploadResult = await uploadFridgeImage({ uri });
                        const base64Image = uploadResult.image;
                        console.log(uploadResult);
                        setFridgeImage(base64Image);


                        /*
                        const recipes = await getRecipesByIngredients(uploadResult.ingredients);
                        setSuggestedRecipes(recipes);
                        */
                    }
                }
            }
        );
    };

    const renderRecipeItem = ({ item }: { item: Recipe }) => (
        <View style={styles.recipeItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fridge Chef</Text>

            {fridgeImage ? (
                <Image source={{ uri: fridgeImage }} style={styles.fridgeImage} />
            ) : (
                <TouchableOpacity style={styles.cameraButton} onPress={takeFridgePhoto}>
                    <FontAwesome name="camera" size={40} color="#fff" />
                    <Text style={styles.cameraButtonText}>Take a photo of your fridge</Text>
                </TouchableOpacity>
            )}

            {suggestedRecipes.length > 0 && (
                <>
                    <Text style={styles.suggestedRecipesTitle}>Suggested Recipes</Text>
                    <FlatList
                        data={suggestedRecipes}
                        renderItem={renderRecipeItem}
                        keyExtractor={(item) => item._id.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e0f7fa',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#00796b',
        textAlign: 'center',
    },
    cameraButton: {
        backgroundColor: '#4a90e2',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cameraButtonText: {
        color: '#fff',
        marginTop: 10,
        fontSize: 16,
    },
    fridgeImage: {
        width: '100%',
        height: 250,
        borderRadius: 15,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#4a90e2',
    },
    suggestedRecipesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#00796b',
        textAlign: 'center',
    },
    recipeItem: {
        marginRight: 15,
        borderRadius: 10,
        overflow: 'hidden',
    },
    recipeImage: {
        width: 130,
        height: 130,
        borderRadius: 10,
    },
    recipeName: {
        marginTop: 5,
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default Main;
