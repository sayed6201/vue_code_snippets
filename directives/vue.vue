
<template>
    <div>
        <!-- v-if -->
        <div v-if="showElement">This element is shown if showElement is true.</div>

        <!-- v-for -->
        <ul>
            <li v-for="item in items" :key="item.id">{{ item.name }}</li>
        </ul>

        <!--
            The `v-bind` directive in Vue.js is used to bind the value of an HTML attribute to a data property in the Vue instance. 
            It allows you to dynamically update the attribute based on the value of the data property.
            Syntax:
                <element v-bind:attribute="dataProperty">
            Example:
                <img v-bind:src="imageUrl">
            In the above example, the `src` attribute of the `img` element is bound to the `imageUrl` data property. 
            Whenever the value of `imageUrl` changes, the `src` attribute will be updated accordingly.
            For more information, refer to the official Vue.js documentation: https://vuejs.org/v2/api/#v-bind
        -->
        <!-- v-bind -->
        <div v-bind:class="{ active: isActive }">This element has the 'active' class if isActive is true.</div>

        <!-- v-on -->
        <button v-on:click="handleClick">Click me</button>

        <!-- v-model -->
            /**
            * The `v-model` directive is a shorthand for binding data to form inputs and components in Vue.js.
            * It allows you to create two-way data bindings between the input value and a data property.
            * When the input value changes, the data property is updated, and vice versa.
            * This directive is commonly used with form inputs like text fields, checkboxes, and radio buttons.
            * Usage:
            * <input v-model="dataProperty">
            *
            * @param {any} dataProperty - The data property to bind the input value to.
            */
        <input v-model="message" placeholder="Enter a message">

        <!-- v-show -->
        <div v-show="showElement">This element is shown or hidden based on the value of showElement.</div>

        <!-- v-text -->
        <p v-text="message"></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showElement: true,
            items: [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' },
                { id: 3, name: 'Item 3' }
            ],
            isActive: true,
            message: ''
        };
    },
    methods: {
        handleClick() {
            // Handle button click event
        }
    }
};
</script>