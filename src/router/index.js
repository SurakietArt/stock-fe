import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import BASE_URL from '../api/BASE_URL.js'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import UpdateProduct from '../views/UpdateProduct.vue'
import NewProduct from '../views/NewProduct.vue'
import Category from '../views/Category.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
	   path: '/login',
	   name: 'login',
	   component: Login
	},
	{
	   path: '/profile',
	   name: 'profile',
	   component: Profile
	},
	{
	   path: '/update',
	   name: 'update',
	   component: UpdateProduct
	},
	{
	   path: '/new',
	   name: 'new',
	   component: NewProduct
	},
	{
	   path: '/category',
	   name: 'category',
	   component: Category
	}
]
//createRouter
const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes })

//Navigation Guard
// router.beforeEach((to, from, next) => {
//
//    // create body
//    const body = { TOKEN: null }
//
//    //Get token
//    //From local storage if exist
//    if ( localStorage.getItem('TOKEN') ) {
//       body.TOKEN = localStorage.getItem('TOKEN')
//    }
//
//    //Authentication actions
//    axios.post(`${BASE_URL}/token`, body)
//       .then(res => {
//          if ( to.name !== 'login' && res.data.status !== 200 ) next({ name: 'login' })
//          else next()
//       })
//       .catch(err => {
//          console.log('error', err)
//       })
// })

export default router