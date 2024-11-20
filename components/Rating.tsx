import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type RatingProps = {
    rating: number;
    onRate?: (rating: number) => void;
    size?: number;
    readonly?: boolean;
};

const Rating = ({ rating, onRate, size = 20, readonly = false }: RatingProps) => {
    return (
        <View style={styles.container}>
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                    key={star}
                    onPress={() => !readonly && onRate?.(star)}
                    disabled={readonly}
                    style={styles.starContainer}
                >
                    <FontAwesome
                        name={star <= rating ? 'star' : 'star-o'}
                        size={size}
                        color={star <= rating ? 'yellow' : '#ddd'}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    starContainer: {
        padding: 5, // Makes touch target bigger
    },
});

export default Rating;