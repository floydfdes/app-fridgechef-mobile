import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Ensure you have this installed for icons

const Profile = () => {
    const [userProfile, setUserProfile] = useState<any>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId) {
                    setUserId(storedUserId);
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
                setError('Failed to load user information. Please try again.');
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (1) {//make this proper logic later
            fetchUserProfile();
        }
    }, [userId]);

    const fetchUserProfile = async () => {
        try {
            setIsLoading(true);
            setError(null);
            // Replace this with the real API call
            const profileData = {
                profilePicture: 'https://via.placeholder.com/150',
                name: 'John Doe',
                username: 'johndoe',
                recipesCount: 23,
                followersCount: 100,
                followingCount: 50,
                bio: 'Lorem ipsum dolor sit amet.',
                recipes: [
                    { id: '1', name: 'Recipe 1', imageUrl: 'https://via.placeholder.com/120' },
                    { id: '2', name: 'Recipe 2', imageUrl: 'https://via.placeholder.com/120' },
                ],
                recentActivity: [
                    { icon: 'heart', text: 'Liked your recipe' },
                    { icon: 'comment', text: 'Commented on your recipe' },
                ],
            };
            setUserProfile(profileData);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError('Failed to load user profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateProfile = async (updatedData: any) => {
        try {
            // Simulate a successful profile update
            setUserProfile(updatedData);
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        }
    };

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchUserProfile}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!userProfile) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>No profile data available.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: userProfile.profilePicture }}
                    style={styles.profilePicture}
                />
                <View style={styles.headerInfo}>
                    <Text style={styles.name}>{userProfile.name}</Text>
                    <Text style={styles.username}>@{userProfile.username}</Text>
                </View>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{userProfile.recipesCount}</Text>
                    <Text style={styles.statLabel}>Recipes</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{userProfile.followersCount}</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{userProfile.followingCount}</Text>
                    <Text style={styles.statLabel}>Following</Text>
                </View>
            </View>

            <Text style={styles.bio}>{userProfile.bio}</Text>

            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Recipes</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {userProfile.recipes.map((recipe: any) => (
                        <View key={recipe.id} style={styles.recipeThumbnail}>
                            <Image source={{ uri: recipe.imageUrl }} style={styles.recipeImage} />
                            <Text style={styles.recipeName}>{recipe.name}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                {userProfile.recentActivity.map((activity: any, index: number) => (
                    <View key={index} style={styles.activityItem}>
                        <FontAwesome name={activity.icon} size={16} color="black" />
                        <Text style={styles.activityText}>{activity.text}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        fontSize: 18,
        color: '#000',
    },
    errorText: {
        fontSize: 16,
        color: '#ff0000',
        textAlign: 'center',
        marginHorizontal: 20,
    },
    retryButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    profilePicture: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },
    headerInfo: {
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    username: {
        fontSize: 16,
        color: '#888',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    statLabel: {
        fontSize: 14,
        color: '#888',
    },
    bio: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    editButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 20,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    recipeThumbnail: {
        width: 120,
        height: 160,
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    recipeImage: {
        width: 120,
        height: 120,
    },
    recipeName: {
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
        paddingTop: 5,
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    activityText: {
        fontSize: 16,
        color: '#000',
        marginLeft: 10,
    },
});

export default Profile;
