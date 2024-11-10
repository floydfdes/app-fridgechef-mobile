import { Text, View } from 'react-native';

import React from 'react';

const MainScreen = () => {
    return (
        <View>
            <Text>Welcome to Fridge Chef!</Text>
        </View>
    );
};

export default MainScreen;


// import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useState } from 'react';
// import { getRecipesByIngredients, uploadFridgeImage } from '../../services/api';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { launchCamera } from 'react-native-image-picker';

// export type Recipe = {
//     id: number;
//     name: string;
//     cuisine: string;
//     rating: number;
//     imageUrl: string;
//     difficulty: 'Easy' | 'Medium' | 'Hard';
// };

// const Main = () => {
//     const [fridgeImage, setFridgeImage] = useState("");
//     const [suggestedRecipes, setSuggestedRecipes] = useState([]);

//     const takeFridgePhoto = async () => {
//         launchCamera(
//             {
//                 mediaType: 'photo',
//                 cameraType: 'back',
//                 maxWidth: 1200,
//                 maxHeight: 800,
//                 quality: 1,
//                 includeBase64: false,
//             },
//             async (response) => {
//                 if (response.didCancel) {
//                     console.log('User canceled image picker');
//                 } else if (response.errorMessage) {
//                     console.error('Image Picker Error: ', response.errorMessage);
//                     Alert.alert('Error', 'Failed to open camera. Please try again.');
//                 } else {
//                     const uri = response.assets && response.assets[0].uri;
//                     if (uri) {
//                         setFridgeImage(uri);
//                         try {
//                             const uploadResult = await uploadFridgeImage({ uri });
//                             const recipes = await getRecipesByIngredients(uploadResult.ingredients);
//                             setSuggestedRecipes(recipes);
//                         } catch (error) {
//                             console.error('Error processing image:', error);
//                             Alert.alert('Error', 'Failed to process image. Please try again.');
//                         }
//                     }
//                 }
//             }
//         );
//     };

//     const renderRecipeItem = ({ item }: { item: Recipe }) => (
//         <View style={styles.recipeItem}>
//             <Image source={{ uri: item.imageUrl }} style={styles.recipeImage} />
//             <Text style={styles.recipeName}>{item.name}</Text>
//         </View>
//     );

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Fridge Chef</Text>

//             {fridgeImage ? (
//                 <Image source={{ uri: fridgeImage }} style={styles.fridgeImage} />
//             ) : (
//                 <TouchableOpacity style={styles.cameraButton} onPress={takeFridgePhoto}>
//                     <FontAwesome name="camera" size={40} color="#fff" />
//                     <Text style={styles.cameraButtonText}>Take a photo of your fridge</Text>
//                 </TouchableOpacity>
//             )}

//             {suggestedRecipes.length > 0 && (
//                 <>
//                     <Text style={styles.suggestedRecipesTitle}>Suggested Recipes</Text>
//                     <FlatList
//                         data={suggestedRecipes}
//                         renderItem={renderRecipeItem}
//                         keyExtractor={(item) => item.id.toString()}
//                         horizontal={true}
//                         showsHorizontalScrollIndicator={false}
//                     />
//                 </>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#f0f0f0',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     cameraButton: {
//         backgroundColor: '#4a90e2',
//         padding: 20,
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     cameraButtonText: {
//         color: '#fff',
//         marginTop: 10,
//     },
//     fridgeImage: {
//         width: '100%',
//         height: 200,
//         borderRadius: 10,
//         marginBottom: 20,
//     },
//     suggestedRecipesTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginTop: 20,
//         marginBottom: 10,
//     },
//     recipeItem: {
//         marginRight: 15,
//     },
//     recipeImage: {
//         width: 120,
//         height: 120,
//         borderRadius: 10,
//     },
//     recipeName: {
//         marginTop: 5,
//         textAlign: 'center',
//     },
// });

// export default Main;
