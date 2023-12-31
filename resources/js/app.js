import {createApp} from "vue";
import { createRouter,createWebHistory } from 'vue-router';
import ProductList from './components/ProductList.vue';
import AddProduct from './components/AddProduct.vue';
import EditProduct from './components/EditProduct.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Welcome from './components/Welcome.vue';
import Dashboard from './components/Dashboard.vue';
import App from './components/App.vue';

const routes = [
    { path: '/regsiter', component: Register },
    { path: '/login', component: Login },
    {path:'/welcome', component:Welcome},
    {path:'/dashboard', component:Dashboard},
    {
      path: '/productList',
      component: ProductList,
    },
    {
      path: '/edit-product/:id', // Define a dynamic parameter for the product ID
      name: 'EditProduct',
      component: EditProduct,
    },
    {
      path: '/add-product',
      name: 'AddProduct',
      component: AddProduct,
    },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
  ];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount('#app');