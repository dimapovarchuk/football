import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Teams from '../views/Teams.vue'
import Players from '../views/Players.vue'
import About from '../views/About.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import store from '../store'
import AdminUsers from '../views/AdminUsers.vue'
import AdminTeam from '../views/AdminTeam.vue'
// import AdminNews from '../views/AdminNews.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/teams',
    name: 'teams',
    component: Teams
  },
  {
    path: '/players',
    name: 'players',
    component: Players
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/manager',
    name: 'manager',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (store.state.user_type === 'admin') {
        next()
      } else {
        next('/')
      }
    },
    children: [
      {
        path: 'users',
        component: AdminUsers
      },
      {
        path: 'team',
        component: AdminTeam
      },
      {
        path: 'dashboard',
        component: Dashboard
      },
      // {
      //   path: 'news',
      //   component: AdminNews
      // },
      
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
