class Auth {
    constructor() {
        // todo
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        console.log(`Auth.isAuthenticated: token => ${JSON.stringify(token)}`);
        return token ? true : false;
    }

    static setToken(token) {
        console.log(`Auth.setToken: token => ${JSON.stringify(token)}`);
        localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static removeToken() {
        const token = localStorage.getItem('token');
        console.log(`Auth.removeToken: token => ${JSON.stringify(token)}`);
        localStorage.removeItem('token');
    }
}

export default Auth;