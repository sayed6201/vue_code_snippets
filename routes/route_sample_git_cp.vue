<template>
    <div>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>

        <router-view-></router-view->
    </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';

// Import your sample components
import Home from './components/Home.vue';
import About from './components/About.vue';
import Contact from './components/Contact.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact }
];

const router = new VueRouter({
    routes
});


export default {
    created() {
        // Accessing parameters via router in the created lifecycle hook
        const id = this.$route.params.id;
        console.log(id);
    },
    mounted() {
        // Accessing parameters via router in the mounted lifecycle hook
        const id = this.$route.params.id;
        console.log(id);
    },
 
};

// Passing parameters
// Example: passing the "id" parameter to the "About" screen
this.$router.push({ path: '/about', params: { id: 123 } });


</script>



// Restrict routes based on user role
const routes = [
    { path: '/', component: Home, meta: { requiresAuth: true, roles: ['admin', 'user'] } },
    { path: '/about', component: About, meta: { requiresAuth: true, roles: ['admin', 'user'] } },
    { path: '/contact', component: Contact, meta: { requiresAuth: true, roles: ['admin'] } }
];

// User authentication
router.beforeEach((to, from, next) => {
    const isAuthenticated = /* check if user is authenticated */;
    const userRole = /* get user role */;
    
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next('/login'); // Redirect to login page if not authenticated
        } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
            next('/unauthorized'); // Redirect to unauthorized page if user role does not match
        } else {
            next(); // Proceed to the route
        }
    } else {
        next(); // Proceed to the route
    }
});