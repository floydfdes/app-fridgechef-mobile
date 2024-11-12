import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getUserProfile } from '../../services/api'; // Import your API service
import { UserProfile } from '../../shared/types';


const Profile = ({ navigation }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (userId) {
                    setUserId(userId);
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
                setError('Failed to load user information. Please try again.');
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchUserProfile();
        }
    }, [userId]);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const profileData = await getUserProfile(userId!);
            console.log(profileData)
            setUserProfile(profileData);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setError('Failed to load user profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userId');
            Alert.alert('Logged Out', 'You have been logged out successfully.');
            navigation.navigate('Landing');
        } catch (error) {
            console.error('Error during logout:', error);
            Alert.alert('Logout Failed', 'An error occurred while logging out. Please try again.');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!userProfile) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>User profile not found.</Text>
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
                    <Text style={styles.username}>@{userProfile.name}</Text>
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

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Recipes</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {/* {userProfile.recipes.map((recipe) => (
                        <View key={recipe.id} style={styles.recipeThumbnail}>
                            <Image source={{ uri: recipe.imageUrl }} style={styles.recipeImage} />
                            <Text style={styles.recipeName}>{recipe.name}</Text>
                        </View>
                    ))} */}
                </ScrollView>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                {/* {userProfile.recentActivity.map((activity, index) => (
                    <View key={index} style={styles.activityItem}>
                        <FontAwesome5Icon name={activity.icon} size={16} color="black" />
                        <Text style={styles.activityText}>{activity.text}</Text>
                    </View>
                ))} */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePicture: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    headerInfo: {
        marginLeft: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    username: {
        fontSize: 16,
        color: '#666',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    bio: {
        fontSize: 16,
        marginVertical: 10,
    },
    editButton: {
        backgroundColor: '#6c63ff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    recipeThumbnail: {
        marginRight: 10,
    },
    recipeImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    recipeName: {
        textAlign: 'center',
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    activityText: {
        marginLeft: 5,
    },
    errorText: {
        color: 'red'
    },
    logoutButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    logoutButtonText: {
        color: '#fff',
    },
});

export default Profile;
