// Import Vue and Vuex
import Vue from 'vue';
import Vuex from 'vuex';

// Use Vuex plugin
Vue.use(Vuex);

// Create a new Vuex store
const store = new Vuex.Store({
    state: {
        // Define your state variables here
        count: 0,
        todos: [],
    },
    mutations: {
        // Define mutations to modify the state
        increment(state) {
            state.count++;
        },
        addTodo(state, todo) {
            state.todos.push(todo);
        },
    },
    actions: {
        // Define actions to perform asynchronous tasks
        incrementAsync({ commit }) {
            setTimeout(() => {
                commit('increment');
            }, 1000);
        },
        addTodoAsync({ commit }, todo) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('addTodo', todo);
                    resolve();
                }, 1000);
            });
        },
    },
    getters: {
        // Define getters to compute derived state
        completedTodos(state) {
            return state.todos.filter((todo) => todo.completed);
        },
    },
});

export default store;

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

<template>
    <div>
        <p>Count: {{ count }}</p>
        <ul>
            <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['count', 'todos']),
    },
};
</script>
