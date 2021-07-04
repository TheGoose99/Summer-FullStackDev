import Vue from 'vue'
import store from '../store/index.js'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MainPage from '../components/MainPage.vue'
import NotFound from '../components/NotFound.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      topbar: () => import('../components/NavBar-Home.vue')
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
      topbar: () => import('../components/NavBar-Home.vue')
    }
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (Register.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      default: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
      topbar: () => import('../components/NavBar-Home.vue')
    }
  },
  {
    path: '/forgotpass',
    name: 'Forgot',
    components: {
      default: () => import('../views/Forgot.vue'),
      topbar: () => import('../components/NavBar-Home.vue')
    }
  },
  {
    path: '/main',
    name: 'Main',
    components: {
      default: MainPage,
      sidebar: () => import('../components/NavBar.vue')
    },
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated === false) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
