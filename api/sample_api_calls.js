
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// base API with interceptors for token refresh 
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.example.com',
});

api.interceptors.request.use(
    (config) => {
        const authToken = 'your_auth_token';
        const refreshToken = 'your_refresh_token';

        // Check if token has expired
        if (isTokenExpired(authToken)) {
            // Refresh token
            const newAuthToken = refreshToken(authToken, refreshToken);
            config.headers.Authorization = `Bearer ${newAuthToken}`;
        } else {
            config.headers.Authorization = `Bearer ${authToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        // Modify the response here
        // For example, you can add additional data to the response object
        response.data.additionalData = 'Some additional data';
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// api calls 
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
async function fetchUserList(params) {
    try {
        const response = await api.get('/users', { params });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user list');
    }
}

async function fetchNextPage(params) {
    try {
        const response = await api.get('/users', { params });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch next page');
    }
}

function isTokenExpired(token) {
    // Implement your token expiration logic here
    // Return true if token is expired, false otherwise
    
}

function refreshToken(authToken, refreshToken) {
    // Implement your token refresh logic here
    // Return the new auth token
}

export { fetchUserList, fetchNextPage };
