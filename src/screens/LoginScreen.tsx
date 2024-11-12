import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../services/api';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async () => {
        if (Platform.OS !== 'web') {
            Keyboard.dismiss();
        }

        // Reset previous error messages
        setEmailError('');
        setPasswordError('');

        let hasError = false;

        // Email validation
        if (!email) {
            setEmailError('Please enter your email');
            hasError = true;
        } else {
            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(email)) {
                setEmailError('Please enter a valid email');
                hasError = true;
            }
        }

        // Password validation
        if (!password) {
            setPasswordError('Please enter your password');
            hasError = true;
        } else if (password.length < 6) {
            setPasswordError('Password should be at least 6 characters long');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            const userData = await login(email, password);
            if (userData) {
                await AsyncStorage.setItem('userId', userData['id']);
                console.log('User logged in:', userData);
            }
            navigation.navigate('Home');
        } catch (error: any) {
            console.error('Login failed:', error);
            Alert.alert('Login Failed', error.message || 'Please try again');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.heading}>Login to Your Account</Text>
                <Text style={styles.paragraph}>
                    Sign in to explore a world of culinary possibilities with Fridge Chef.
                </Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#000"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#000"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}

            <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordButtonText}>Forgot Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={styles.signupButtonText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                    By logging in, you agree to our Terms of Service and Privacy Policy.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 40,
        backgroundColor: '#fff', // Replace LinearGradient with a solid color
    },
    contentContainer: {
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    heading: {
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'left',
        letterSpacing: 3,
        marginBottom: 10,
        color: '#000', // Replace colors.primary
        fontFamily: 'PoppinsBold', // Make sure Poppins is available in your project
    },
    paragraph: {
        fontSize: 16,
        textAlign: 'left',
        lineHeight: 30,
        color: '#000', // Replace colors.primary
        fontFamily: 'PoppinsLight',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        flex: 1,
        height: '100%',
        color: '#000',
        fontFamily: 'PoppinsLight',
    },
    button: {
        backgroundColor: '#4CAF50', // Use color codes directly or replace with your custom color
        borderRadius: 35,
        height: 60,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginTop: -10,
        marginRight: 20,
        fontFamily: 'PoppinsLight',
    },
    forgotPasswordButtonText: {
        color: '#000', // Replace with your primary color
    },
    signupButton: {
        backgroundColor: '#fff',
        borderRadius: 35,
        height: 60,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    signupButtonText: {
        color: '#4CAF50', // Replace with your secondary color
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    termsContainer: {
        flex: 1,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    termsText: {
        fontSize: 12,
        color: '#000',
        textAlign: 'center',
        fontFamily: 'PoppinsLight',
    },
    error: {
        color: 'red',
        marginBottom: 5,
        marginTop: -19,
    },
});

export default Login;
