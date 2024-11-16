import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addRecipe } from '../../services/api';
import { colors } from '../../shared/customCSS';

type Ingredient = {
    name: string;
    amount: string;
};

const categories = [
    { id: '1', name: 'Appetizers & Starters', key: 'appetizersAndStarters' },
    { id: '2', name: 'Main Dishes', key: 'mainDishes' },
    { id: '3', name: 'Desserts & Sweets', key: 'dessertsAndSweets' },
    { id: '4', name: 'Salads & Fresh Dishes', key: 'saladsAndFreshDishes' },
    { id: '5', name: 'Soups & Stews', key: 'soupsAndStews' },
    { id: '6', name: 'Breakfast & Morning Meals', key: 'breakfastAndMorningMeals' },
    { id: '7', name: 'Rice, Grains & Pasta', key: 'riceGrainsAndPasta' },
    { id: '8', name: 'Breads & Baked Goods', key: 'breadsAndBakedGoods' },
    { id: '9', name: 'Beverages', key: 'beverages' },
    { id: '10', name: 'Street Food & Snacks', key: 'streetFoodAndSnacks' }
];

const AddRecipeScreen = ({ navigation }) => {
    const [recipe, setRecipe] = useState({
        name: '',
        category: '',
        cuisine: '',
        difficulty: 'Easy',
        imageUrl: '',
        rating: 4.5,
        ingredients: [] as Ingredient[],
        instructions: '',
    });

    const [newIngredient, setNewIngredient] = useState({
        name: '',
        amount: '',
    });

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

    const handleSubmit = async () => {
        try {
            if (!recipe.name || !recipe.category || !recipe.cuisine || recipe.ingredients.length === 0 || !recipe.instructions) {
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
                imageUrl: recipe.imageUrl || 'https://picsum.photos/700',
            };
            console.log('start of console.log');
            console.log(recipeData);
            console.log('end of console.log');
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
                            {categories.map((category) => (
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
                        />
                        <TextInput
                            style={styles.ingredientAmount}
                            value={newIngredient.amount}
                            onChangeText={(text) => setNewIngredient({ ...newIngredient, amount: text })}
                            placeholder="Amount"
                        />
                    </View>
                    <TouchableOpacity style={styles.addIngredientButton} onPress={addIngredient}>
                        <FontAwesome name="plus" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {recipe.ingredients.map((ing, index) => (
                    <View key={index} style={styles.ingredientItem}>
                        <Text style={styles.ingredientText}>
                            {ing.name} - {ing.amount}
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