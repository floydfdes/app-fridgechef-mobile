import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../shared/customCSS';

type SearchBarProps = {
    onSearch: (ingredients: string[]) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (searchTerm.trim()) {
            // Split by commas and clean up each ingredient
            const ingredients = searchTerm
                .split(',')
                .map(ingredient => ingredient.trim())
                .filter(ingredient => ingredient.length > 0);

            onSearch(ingredients);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchInputContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    placeholder="Search by ingredients (comma separated)"
                    placeholderTextColor={colors.secondary}
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSearch}
                >
                    <FontAwesome name="search" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        elevation: 2,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 12,
        marginRight: 10,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },
    searchButton: {
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SearchBar;
