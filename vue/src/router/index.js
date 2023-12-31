import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import Forum from '../views/Forum.vue'
import Profile from '../views/Profile.vue'
import Post from '../views/Post.vue'
import TrendingForums from '../views/TrendingForums.vue'
import Favorite from '../views/Favorite.vue'
import HotPosts from '../views/HotPosts.vue'
import SearchPage from '../views/SearchPage.vue'
import AllForums from '../views/AllForums.vue'
import ForumByNew from '../views/ForumByNew.vue'


Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'hot',
      component: HotPosts,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/forums/trending',
      name: 'trendingForums',
      component: TrendingForums,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/forums',
      name: 'allForums',
      component: AllForums,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/forums/:id',
      name: 'forumPage',
      component: Forum,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/forums/:id/new',
      name: 'forumPageByNew',
      component: ForumByNew,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/user/:id',
      name: 'user',
      component: Profile,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/posts/details/:id',
      name: 'post',
      component: Post,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorite,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/hot',
      name: 'hot',
      component: HotPosts,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/search/:input',
      name: 'search',
      component: SearchPage,
      meta: {
        requiresAuth: false
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
