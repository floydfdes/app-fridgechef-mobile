import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getUserProfile, updateUserProfile } from '../../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-elements';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../../shared/customCSS';
import { UserProfile } from '../../shared/types';

const Profile = ({ navigation }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
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
            setUserProfile(profileData);
            setName(profileData.name);
            setBio(profileData.bio || '');
            setProfilePicture(profileData.profilePicture || null);
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

    const handleImagePicker = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 1,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User canceled image picker');
                } else if (response.errorMessage) {
                    console.error('Image Picker Error: ', response.errorMessage);
                    Alert.alert('Error', 'Failed to open image picker. Please try again.');
                } else {
                    const uri = response.assets && response.assets[0].uri;
                    if (uri) {
                        setProfilePicture(uri);
                    }
                }
            }
        );
    };

    const handleUpdateProfile = async () => {
        try {
            const updatedProfile = {
                name,
                bio,
                profilePicture,
            };
            await updateUserProfile(userId!, updatedProfile);
            Alert.alert('Success', 'Profile updated successfully!');
            fetchUserProfile();
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Update Failed', 'An error occurred while updating your profile. Please try again.');
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
                <TouchableOpacity onPress={handleImagePicker}>
                    <Avatar
                        rounded
                        size="large"
                        source={profilePicture ? { uri: profilePicture } : undefined}
                        title={name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                        overlayContainerStyle={{ backgroundColor: colors.primary }}
                        titleStyle={{ color: colors.third }}
                    />
                </TouchableOpacity>
                <View style={styles.headerInfo}>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Name"
                    />
                    <TextInput
                        style={styles.input}
                        value={bio}
                        onChangeText={setBio}
                        placeholder="Bio"
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
                <Text style={styles.updateButtonText}>Update Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Recipes</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {/* Render user recipes here */}
                </ScrollView>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                {/* Render recent activity here */}
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('Users')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>View All Users</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerInfo: {
        marginLeft: 10,
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
    updateButton: {
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    updateButtonText: {
        color: colors.third,
        fontWeight: 'bold',
    },
    logoutButton: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: colors.primary,
    },
    logoutButtonText: {
        color: colors.third,
        fontWeight: 'bold',
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#4a90e2',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default Profile;
