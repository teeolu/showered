import { AsyncStorage } from 'react-native';

export const isAuthenticated = async () => {
    const token = await this.getToken();
    return token ? true : false;
}

export const setToken = async (token) => {
    try {
        await AsyncStorage.setItem('@showered@token', token);
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('@showered@token');
        if (token !== null) {
            return token;
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('@showered@token');
    } catch (error) {
        throw new Error(error.message)
    }
}