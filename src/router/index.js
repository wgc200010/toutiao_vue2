import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/login-index.vue'
import Layout from '@/views/Layout/layout-index.vue'
import Home from '@/views/Home/home-index.vue'
import User from '@/views/User/user-index.vue'
import Search from '@/views/Search/search_index.vue'
import SearchResult from '@/views/Search/Search_Result.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/layout/home'
},
{
  path: '/login',
  component: Login
}, {
  path: '/layout',
  component: Layout,
  children: [
    {
      path: 'home',
      component: Home
    },
    {
      path: 'user',
      component: User
    }
  ]
}, {
  path: '/search',
  component: Search
}, {
  path: '/search/:keywords',
  component: SearchResult
}
]

const router = new VueRouter({
  routes
})

export default router
