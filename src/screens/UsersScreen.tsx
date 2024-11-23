import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchUsers, followUser, unfollowUser } from '../../services/api';
import { colors } from '../../shared/customCSS'; // Import colors for consistent styling
import { UserProfile } from '../../shared/types';

const UsersScreen = () => {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [followedUsers, setFollowedUsers] = useState<string[]>([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersData = await fetchUsers();
                setUsers(usersData.users);
            } catch (error) {
                Alert.alert('Error', 'Failed to load users.');
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleFollowToggle = async (userId: string) => {
        try {
            const response = followedUsers.includes(userId)
                ? await unfollowUser(userId)
                : await followUser(userId);

            const { updatedUser, requestingUser } = response;

            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user._id === updatedUser._id
                        ? { ...user, followersCount: updatedUser.followersCount }
                        : user
                )
            );

            setUsers(prevUsers =>
                prevUsers.map(user =>
                    user._id === requestingUser._id
                        ? { ...user, followingCount: requestingUser.followingCount }
                        : user
                )
            );

            if (followedUsers.includes(userId)) {
                setFollowedUsers(followedUsers.filter(id => id !== userId));
            } else {
                setFollowedUsers([...followedUsers, userId]);
            }

        } catch (error) {
            Alert.alert('Error', 'Failed to toggle follow status.');
        }
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    const renderUserCard = ({ item }: { item: UserProfile }) => {
        const hasProfilePicture = item.profilePicture && item.profilePicture !== '';
        const initials = item.name ? item.name.split(' ').map(n => n[0]).join('').toUpperCase() : '';

        return (
            <View style={styles.userCard}>
                <View style={styles.header}>
                    <View style={styles.profileContainer}>
                        {hasProfilePicture ? (
                            <Image source={{ uri: item.profilePicture }} style={styles.profilePicture} />
                        ) : (
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{initials}</Text>
                            </View>
                        )}
                        <Text style={styles.userName}>{item.name}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => handleFollowToggle(item._id)}
                        style={styles.followButton}
                    >
                        <Text style={styles.buttonText}>
                            {followedUsers.includes(item._id) ? 'Unfollow' : 'Follow'}
                        </Text>
                    </TouchableOpacity>
                </View>
                {item.bio && <Text style={styles.userBio}>{item.bio}</Text>}
                <View style={styles.userStats}>
                    <Text style={styles.userStat}>Recipes: {item.recipesCount}</Text>
                    <Text style={styles.userStat}>Followers: {item.followersCount}</Text>
                    <Text style={styles.userStat}>Following: {item.followingCount}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={(item) => item._id.toString()}
                renderItem={renderUserCard}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    list: {
        paddingBottom: 20,
    },
    userCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePicture: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Poppins-Bold',
    },
    followButton: {
        backgroundColor: colors.primary,
        padding: 8,
        borderRadius: 5,
    },
    userName: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
    },
    userBio: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 4,
        marginBottom: 8,
        fontFamily: 'Poppins-Regular',
    },
    userStats: {
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    userStat: {
        fontSize: 12,
        color: '#999',
        fontFamily: 'Poppins-Regular',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Poppins-Regular', // Use the specified font family
    },
});

export default UsersScreen;
