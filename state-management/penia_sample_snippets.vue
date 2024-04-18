<template>
    <div>
        <h1>{{ store.message }}</h1>
        <input v-model="store.userCred.username" placeholder="Username" />
        <input v-model="store.userCred.password" placeholder="Password" />
        <input v-model="store.userCred.email" placeholder="Email" />
        <button @click="updateMessage">Update Message</button>
        <button @click="updateUserCred">Update User Credentials</button>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import { useStore } from 'pinia';

    export default defineComponent({
        name: 'PeniaSampleSnippets',
        setup() {
            const store = useStore('myStore');

            const updateMessage = async () => {
                try {
                    const response = await store.updateMessage();
                    console.log(response);
                } catch (error) {
                    console.error(error);
                }
            };

            const updateUserCred = () => {
                store.updateUserCred(store.userCred);
            };

            return {
                store,
                updateMessage,
                updateUserCred,
            };
        },
    });
</script>

    <!-- <script setup>
        // import { defineComponent } from 'vue';
        // import { useStore } from 'pinia';

        // const store = useStore();

        // const updateMessage = async () => {
        //     try {
        //         const response = await store.updateMessage();
        //         console.log(response);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // };

        // const updateUserCred = () => {
        //     store.updateUserCred(store.userCred);
        // };

        // return {
        //     store,
        //     updateMessage,
        //     updateUserCred,
        // };
    </script> -->

<script>

    // Define a new store using Pinia
    import { defineStore } from 'pinia';

    export const useMyStore = defineStore({
        id: 'myStore',
        state: () => ({
            message: 'Hello, world!',
            userCred: {
                username: '',
                password: '',
                email: '',
            }
        }),
        actions: {
            async updateMessage() {
                // Perform some asynchronous operation here
                return 'Message updated successfully';
            },
            updateUserCred(cred) {
                this.userCred = cred;
            },
            getUserCred() {
                return this.userCred;
            },
        },
    });
</script>
