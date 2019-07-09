const URL = 'http://localhost:5000'

export const signupUserApi = ( email, firstName, lastName, password) => {
    const payload = {
        email,
        firstName,
        lastName,
        password,
    };
    const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        credentials: 'same-origin',
        body: JSON.stringify(payload)
    };
    const endpoint = `${URL}/api/users/register`;
    return new Promise((resolve, reject) => {
        fetch(endpoint, init)
        .then(async (response) => {
            const result = {
                success: response.ok,
                status: response.status
            };
            const contentLength = response.headers.get('Content-Length');
            if (contentLength && contentLength > 0) {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.startsWith('application/json')) {
                    try {
                        const json = await response.json();
                        result['payload'] = json;
                        return result;
                    } catch(error) {
                        result['payload'] = {};
                        return result;
                    }
                } else {
                    result['payload'] = {};
                    return result;
                }
            } else {
                result['payload'] = {};
                return result;
            }
        })
        .then((result) => resolve(result))
        .catch((error) => {
            resolve({
                success:false,
                status: 0,
                statusText: '',
                payload: error
            });
        });
    });
};

export const loginUserApi = ( email, password) => {
    const payload = {
        email,
        password
    };
    const init = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        credentials: 'same-origin',
        body: JSON.stringify(payload)
    };
    const endpoint = `${URL}/api/users/login`;
    return new Promise((resolve, reject) => {
        fetch(endpoint, init)
        .then(async (response) => {
            let result = {
                success: response.ok,
                status: response.status
            };
            const contentLength = response.headers.get('Content-Length');
            if (contentLength && contentLength > 0) {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.startsWith('application/json')) {
                    try {
                        const json = await response.json();
                        result = {...result, ...json};
                        return result;
                    } catch(error) {
                        return result;
                    }
                } else {
                    return result;
                }
            } else {
                return result;
            }
        })
        .then((result) => resolve(result))
        .catch((error) => {
            resolve({
                success:false,
                status: 0,
                payload: error
            });
        });
    });
};

export const userinfoApi = () => {
    const init = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        credentials: 'same-origin'
    };
    const endpoint = `${URL}/api/users/auth`;
    return new Promise((resolve, reject) => {
        fetch(endpoint, init)
        .then(async (response) => {
            let result = {
                success: response.ok,
                status: response.status
            };
            const contentLength = response.headers.get('Content-Length');
            if (contentLength && contentLength > 0) {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.startsWith('application/json')) {
                    try {
                        const json = await response.json();
                        result = {...result, ...json};
                        return result;
                    } catch(error) {
                        return result;
                    }
                } else {
                    return result;
                }
            } else {
                return result;
            }
        })
        .then((result) => resolve(result))
        .catch((error) => {
            resolve({
                success:false,
                status: 0,
                payload: error
            });
        });
    });
};