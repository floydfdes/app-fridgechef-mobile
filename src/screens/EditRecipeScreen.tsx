import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { updateRecipe } from '../../services/api';
import { RECIPE_CATEGORIES, RECIPE_DIFFICULTIES } from '../../shared/constants';
import { colors } from '../../shared/customCSS';

const EditRecipeScreen = ({ route, navigation }) => {
    const { recipe } = route.params;
    const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
    const [selectedCategory, setSelectedCategory] = useState(recipe.category);
    const [selectedDifficulty, setSelectedDifficulty] = useState(recipe.difficulty);

    const handleUpdate = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                navigation.navigate('Login');
                return;
            }

            await updateRecipe(updatedRecipe._id, {
                ...updatedRecipe,
                category: selectedCategory,
                cuisine: updatedRecipe.cuisine,
                difficulty: selectedDifficulty
            });
            Alert.alert('Success', 'Recipe updated successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating recipe:', error);
            Alert.alert('Error', 'Failed to update recipe. Please try again.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Edit Recipe</Text>

            <View style={styles.section}>
                <TextInput
                    style={styles.input}
                    value={updatedRecipe.name}
                    onChangeText={(text) => setUpdatedRecipe({ ...updatedRecipe, name: text })}
                    placeholder="Recipe Name"
                    placeholderTextColor={colors.secondary}
                />

                <Text style={styles.label}>Category</Text>
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(value) => {
                        setSelectedCategory(value);
                        setUpdatedRecipe({ ...updatedRecipe, category: value });
                    }}
                    style={styles.picker}
                >
                    <Picker.Item label="Select a category" value="" />
                    {RECIPE_CATEGORIES.map((category) => (
                        <Picker.Item key={category.key} label={category.name} value={category.key} />
                    ))}
                </Picker>

                <Text style={styles.label}>Cuisine</Text>
                <TextInput
                    style={styles.input}
                    value={updatedRecipe.cuisine}
                    onChangeText={(text) => setUpdatedRecipe({ ...updatedRecipe, cuisine: text })}
                    placeholder="Enter Cuisine"
                    placeholderTextColor={colors.secondary}
                />

                <Text style={styles.label}>Difficulty</Text>
                <Picker
                    selectedValue={selectedDifficulty}
                    onValueChange={(value) => {
                        setSelectedDifficulty(value);
                        setUpdatedRecipe({ ...updatedRecipe, difficulty: value });
                    }}
                    style={styles.picker}
                >
                    <Picker.Item label="Select difficulty" value="" />
                    {RECIPE_DIFFICULTIES.map((difficulty) => (
                        <Picker.Item key={difficulty.value} label={difficulty.label} value={difficulty.value} />
                    ))}
                </Picker>

                <TextInput
                    style={[styles.input, styles.instructionsInput]}
                    value={updatedRecipe.instructions}
                    onChangeText={(text) => setUpdatedRecipe({ ...updatedRecipe, instructions: text })}
                    placeholder="Instructions"
                    placeholderTextColor={colors.secondary}
                    multiline
                />
            </View>

            <TouchableOpacity onPress={handleUpdate} style={styles.updateButton}>
                <Text style={styles.updateButtonText}>Update Recipe</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.third,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
        marginBottom: 20,
        color: colors.primary,
    },
    section: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        color: colors.secondary,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    instructionsInput: {
        height: 100,
    },
    updateButton: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    updateButtonText: {
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },
});

export default EditRecipeScreen;
