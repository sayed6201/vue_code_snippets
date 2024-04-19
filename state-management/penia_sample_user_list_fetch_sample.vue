<template>
    <div>
        <button @click="fetchUserList">Fetch User List</button>
        <ul>
            <li v-for="user in userList" :key="user.id">{{ user.name }}</li>
        </ul>
        <button @click="fetchNextPage" :disabled="currentPage === totalPages">Next Page</button>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'pinia';

export default defineComponent({
    name: 'UserList',
    setup() {
        const store = useStore();

        const userList = ref([]);
        const currentPage = ref(1);
        const totalPages = ref(0);

        const fetchUserList = async () => {
            const region = 'your_region';
            const authToken = 'your_auth_token';

            try {
                const response = await store.fetchUserList({ region }, { headers: { Authorization: `Bearer ${authToken}` } });
                userList.value = response.data.users;
                totalPages.value = response.data.totalPages;
                currentPage.value = 1;
            } catch (error) {
                console.error('Failed to fetch user list:', error);
            }
        };

        const fetchNextPage = async () => {
            const region = 'your_region';
            const authToken = 'your_auth_token';

            try {
                const response = await store.fetchUserList({ region, page: currentPage.value + 1 }, { headers: { Authorization: `Bearer ${authToken}` } });
                userList.value = [...userList.value, ...response.data.users];
                currentPage.value += 1;
            } catch (error) {
                console.error('Failed to fetch next page:', error);
            }
        };

        return {
            userList,
            currentPage,
            totalPages,
            fetchUserList,
            fetchNextPage,
        };
    },
});
</script>



<!-->>>>>>store codes for fetching user list >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> -->
import { createStore } from 'pinia';

export const useUserStore = createStore({
    state: () => ({
        userList: [],
        currentPage: 1,
        totalPages: 0,
    }),
    actions: {
        async fetchUserList({ state }, { region, authToken }) {
            try {
                const response = await fetchUserList({ region }, { headers: { Authorization: `Bearer ${authToken}` } });
                state.userList = response.data.users;
                state.totalPages = response.data.totalPages;
                state.currentPage = 1;
            } catch (error) {
                console.error('Failed to fetch user list:', error);
            }
        },
        async fetchNextPage({ state }, { region, authToken }) {
            try {
                const response = await fetchUserList({ region, page: state.currentPage + 1 }, { headers: { Authorization: `Bearer ${authToken}` } });
                state.userList = [...state.userList, ...response.data.users];
                state.currentPage += 1;
            } catch (error) {
                console.error('Failed to fetch next page:', error);
            }
        },
    },
});


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
