import Vue from 'vue'
import VueRouter from 'vue-router'
import displayLayout from "../components/displayLayout.vue"
//import editLayout from "../components/editLayout.vue";
import errorPage from "../components/errorPage.vue"

Vue.use(VueRouter)

  const routes = [
    {
      path: '/displayLayout/:layoutId',
      name: 'displayLayout',
      component: displayLayout
    },
    {
      path:'/logError/:errorMessage',
      name:'errorPage',
      component: errorPage
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
