import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors } from '../shared/customCSS';

type SearchBarProps = {
    onSearch: (searchTerm: string, type: 'ingredients' | 'text') => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState<'ingredients' | 'text'>('ingredients');

    const handleSearch = () => {
        if (searchType === 'ingredients') {
            const ingredients = searchTerm
                .split(',')
                .map(ingredient => ingredient.trim())
                .filter(ingredient => ingredient.length > 0);
            onSearch(ingredients.join(','), 'ingredients');
        } else {
            onSearch(searchTerm.trim(), 'text');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchTypeContainer}>
                <TouchableOpacity
                    style={[
                        styles.typeButton,
                        searchType === 'ingredients' && styles.activeTypeButton
                    ]}
                    onPress={() => setSearchType('ingredients')}
                >
                    <FontAwesome name="list" size={16} color={searchType === 'ingredients' ? '#fff' : colors.primary} />
                    <Text style={[styles.typeText, searchType === 'ingredients' && styles.activeTypeText]}>
                        By Ingredients
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.typeButton,
                        searchType === 'text' && styles.activeTypeButton
                    ]}
                    onPress={() => setSearchType('text')}
                >
                    <FontAwesome name="search" size={16} color={searchType === 'text' ? '#fff' : colors.primary} />
                    <Text style={[styles.typeText, searchType === 'text' && styles.activeTypeText]}>
                        Free Search
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.searchInputContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    placeholder={searchType === 'ingredients'
                        ? "Enter ingredients (comma separated)"
                        : "Search recipes..."
                    }
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
    searchTypeContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    typeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 20,
        flex: 1,
        marginHorizontal: 5,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.primary,
    },
    activeTypeButton: {
        backgroundColor: colors.primary,
    },
    typeText: {
        marginLeft: 5,
        color: colors.primary,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },
    activeTypeText: {
        color: '#fff',
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
