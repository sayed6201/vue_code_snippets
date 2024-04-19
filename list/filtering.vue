<template>
    <div>
        <input type="text" v-model="searchTerm" placeholder="Search...">
        <ul>
            <li v-for="item in filteredItems" :key="item.id">{{ item.name }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchTerm: '',
                items: [
                    { id: 1, name: 'Apple' },
                    { id: 2, name: 'Banana' },
                    { id: 3, name: 'Orange' },
                    { id: 4, name: 'Mango' }
                ]
            };
        },
        computed: {
            filteredItems() {
                return this.items.filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
            }
        }
    };
</script>

<!-- 
<script setup>
    import { ref, computed } from 'vue';

    const searchTerm = ref('');
    const items = [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Banana' },
        { id: 3, name: 'Orange' },
        { id: 4, name: 'Mango' }
    ];

    const filteredItems = computed(() => {
        return items.filter(item => item.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
    });
</script> -->