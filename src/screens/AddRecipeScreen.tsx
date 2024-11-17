import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addRecipe } from '../../services/api';
import { PLACEHOLDER_IMAGE, RECIPE_CATEGORIES } from '../../shared/constants';
import { colors } from '../../shared/customCSS';
import { Ingredient } from '../../shared/types';

const AddRecipeScreen = ({ navigation }) => {
    const [recipe, setRecipe] = useState({
        name: '',
        category: '',
        cuisine: '',
        difficulty: 'Easy',
        ingredients: [] as Ingredient[],
        instructions: '',
        imageUrl: '',
    });

    const [newIngredient, setNewIngredient] = useState({
        name: '',
        amount: '',
    });

    const [showImageOptions, setShowImageOptions] = useState(false);

    const addIngredient = () => {
        if (newIngredient.name && newIngredient.amount) {
            setRecipe({
                ...recipe,
                ingredients: [...recipe.ingredients, { ...newIngredient }],
            });
            setNewIngredient({ name: '', amount: '' });
        }
    };

    const removeIngredient = (index: number) => {
        const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);
        setRecipe({ ...recipe, ingredients: updatedIngredients });
    };

    const selectImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
        });

        if (result.assets?.[0]?.uri) {
            setRecipe({ ...recipe, imageUrl: result.assets[0].uri });
            setShowImageOptions(false);
        }
    };

    const handleImageUrl = (url: string) => {
        setRecipe({ ...recipe, imageUrl: url });
    };

    const handleSubmit = async () => {
        try {
            if (!recipe.name || !recipe.category || !recipe.cuisine || !recipe.ingredients.length || !recipe.instructions) {
                Alert.alert('Error', 'Please fill in all required fields');
                return;
            }

            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                navigation.navigate('Login');
                return;
            }

            const recipeData = {
                ...recipe,
                createdBy: userId,
            };

            await addRecipe(recipeData);
            Alert.alert('Success', 'Recipe added successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error adding recipe:', error);
            Alert.alert('Error', 'Failed to add recipe. Please try again.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Add New Recipe</Text>

            {/* Basic Info Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Basic Information</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Recipe Name *</Text>
                    <TextInput
                        style={styles.input}
                        value={recipe.name}
                        onChangeText={(text) => setRecipe({ ...recipe, name: text })}
                        placeholder="Enter recipe name"
                        placeholderTextColor={colors.primary}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Category *</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={recipe.category}
                            onValueChange={(value) => setRecipe({ ...recipe, category: value })}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select a category" value="" />
                            {RECIPE_CATEGORIES.map((category) => (
                                <Picker.Item
                                    key={category.id}
                                    label={category.name}
                                    value={category.key}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Cuisine *</Text>
                    <TextInput
                        style={styles.input}
                        value={recipe.cuisine}
                        onChangeText={(text) => setRecipe({ ...recipe, cuisine: text })}
                        placeholder="Enter cuisine type (e.g., Italian, Asian)"
                        placeholderTextColor={colors.primary}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Difficulty</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={recipe.difficulty}
                            onValueChange={(value) => setRecipe({ ...recipe, difficulty: value })}
                            style={styles.picker}
                        >
                            <Picker.Item label="Easy" value="Easy" />
                            <Picker.Item label="Intermediate" value="Intermediate" />
                            <Picker.Item label="Advanced" value="Advanced" />
                        </Picker>
                    </View>
                </View>
            </View>

            {/* Image Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recipe Image</Text>

                <TouchableOpacity
                    style={styles.imageOptionsButton}
                    onPress={() => setShowImageOptions(!showImageOptions)}
                >
                    <FontAwesome name="image" size={20} color="#fff" />
                    <Text style={styles.imageOptionsText}>Add Image</Text>
                </TouchableOpacity>

                {showImageOptions && (
                    <View style={styles.imageOptionsContainer}>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={selectImage}
                        >
                            <FontAwesome name="folder" size={20} color={colors.primary} />
                            <Text style={styles.optionText}>Choose from Device</Text>
                        </TouchableOpacity>

                        <Text style={styles.orText}>OR</Text>

                        <TextInput
                            style={styles.urlInput}
                            value={recipe.imageUrl}
                            onChangeText={handleImageUrl}
                            placeholder="Paste image URL"
                            placeholderTextColor={colors.primary}
                        />
                    </View>
                )}

                {recipe.imageUrl && (
                    <View style={styles.imagePreviewContainer}>
                        <Image
                            source={{ uri: recipe.imageUrl }}
                            style={styles.imagePreview}
                            defaultSource={PLACEHOLDER_IMAGE}
                        />
                        <TouchableOpacity
                            style={styles.removeImageButton}
                            onPress={() => setRecipe({ ...recipe, imageUrl: '' })}
                        >
                            <FontAwesome name="times" size={20} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Ingredients Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ingredients</Text>

                <View style={styles.ingredientInputContainer}>
                    <View style={styles.ingredientInput}>
                        <TextInput
                            style={styles.ingredientName}
                            value={newIngredient.name}
                            onChangeText={(text) => setNewIngredient({ ...newIngredient, name: text })}
                            placeholder="Ingredient name"
                            placeholderTextColor={colors.primary}
                        />
                        <TextInput
                            style={styles.ingredientAmount}
                            value={newIngredient.amount}
                            onChangeText={(text) => setNewIngredient({ ...newIngredient, amount: text })}
                            placeholder="Amount"
                            placeholderTextColor={colors.primary}
                        />
                    </View>
                    <TouchableOpacity style={styles.addIngredientButton} onPress={addIngredient}>
                        <FontAwesome name="plus" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {recipe.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                        <Text style={styles.ingredientText}>
                            {ingredient.name} - {ingredient.amount}
                        </Text>
                        <TouchableOpacity onPress={() => removeIngredient(index)}>
                            <FontAwesome name="times" size={20} color={colors.primary} />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* Instructions Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Instructions</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={recipe.instructions}
                    onChangeText={(text) => setRecipe({ ...recipe, instructions: text })}
                    placeholder="Enter step-by-step instructions"
                    placeholderTextColor={colors.primary}
                    multiline
                    numberOfLines={6}
                />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <FontAwesome name="check" size={20} color="#fff" />
                <Text style={styles.submitButtonText}>Add Recipe</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.third,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        color: colors.primary,
        marginBottom: 20,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: colors.primary,
        marginBottom: 15,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: colors.secondary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    pickerContainer: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
    },
    imageOptionsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 8,
        justifyContent: 'center',
        marginBottom: 10,
    },
    imageOptionsText: {
        marginLeft: 8,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },
    imageOptionsContainer: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    optionText: {
        marginLeft: 8,
        color: colors.primary,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },
    orText: {
        textAlign: 'center',
        color: colors.secondary,
        fontFamily: 'Poppins-Regular',
        marginVertical: 10,
    },
    urlInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        fontFamily: 'Poppins-Regular',
    },
    imagePreviewContainer: {
        position: 'relative',
        marginTop: 10,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    removeImageButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 5,
        elevation: 2,
    },
    ingredientInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ingredientInput: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 10,
    },
    ingredientName: {
        flex: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        marginRight: 10,
    },
    ingredientAmount: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
    },
    addIngredientButton: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ingredientItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    ingredientText: {
        flex: 1,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        marginVertical: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        marginLeft: 10,
    },
});

export default AddRecipeScreen;