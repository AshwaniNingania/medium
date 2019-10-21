import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignIn from './views/SignIn.vue'
import Editor from './views/Editor.vue'
import Settings from './views/Settings.vue'
import ArticleDetail from './views/ArticleDetail.vue'
import UserProfile from './views/UserProfile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/new/:slug',
      name: 'new',
      component: Editor,
    },
    {
      path: '/new',
      name: 'add',
      component: Editor,
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: () => import(/* webpackChunkName: "SignUp" */ './views/SignUp.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/user/@:username',
      name: 'user-profile',
      component: UserProfile
    },
    {
      path: '/article/@:slug',
      name: 'article-detail',
      component: ArticleDetail
    }
  ]
})
