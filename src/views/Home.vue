<template>
	<HeaderHome :fullname="fullname"></HeaderHome>
	<SearchBar v-on:change-keyword="search()"></SearchBar>
	<Menu></Menu>
	<CategoryBar v-on:change-category="search()"></CategoryBar>
	<Card :cards="products" v-on:btn-delete-product="showModalDelete = !showModalDelete" ></Card>
	<Modal v-on:reload-product="reloadProduct()" v-on:closeModal="showModalDelete = !showModalDelete" :is-show-modal="showModalDelete" actions="deleteProduct"></Modal>
</template>

<script setup>
   
   import { useStore } from 'vuex'
   import { ref, onMounted, computed } from 'vue'
   import { useRouter } from 'vue-router'
   
   import checkToken from '../api/account/checkToken.js'
   import HeaderHome from '../components/HeaderHome.vue'
   import SearchBar from '../components/SearchBar.vue'
   import CategoryBar from '../components/CategoryBar.vue'
   import Menu from '../components/Menu.vue'
   import Card from '../components/Card.vue'
   import Modal from '../components/Modal.vue'
   
   //Home variabel
   const store = useStore()
   const router = useRouter()
   const showModalDelete = ref(false)
   
   //Get username
   const fullname = computed(() => {
      return store.getters.fullname
   })
   
   //Reload / get product if event reload-product firing
   const reloadProduct = () => {
      //Get All products from server
     store.dispatch('getProducts')
   }
   
   //Get all products
   const products = computed(() => {
      return store.getters.products
   })
   
   //changeCategory or change-keyword
   const search = () => {
      //alert('search')
      store.dispatch('getProductsBy', bodySearch.value)
   }
   
   const bodySearch = computed(() => {
      return store.getters.bodySearch
   })
   
   //If user not authenticated
   const isAuthenticated = res => {
      
      //code response , true if === 200
      if ( res.status !== 200 ) {
         router.push({ name: 'login' });
      } else {
         router.push({ name: 'home' })
      }
   }
   
   //Validation 
   onMounted(() => {
      
      //If current category not All
      const currentCategoryFromState = computed(() => {
         return store.getters.currentCategory
      })
      
      if (currentCategoryFromState.value !== 'All') {
         //Get products by search again
         store.dispatch('getProductsBy', bodySearch.value)
      } else {
         //Get All products from server
         store.dispatch('getProducts')
      }
      
      //Set fullname from server
      // store.dispatch('getProfile')
      
      //The body
      const body = {
         TOKEN: null
      }
      
      //get TOKEN
      //From local storage if exist
      if ( localStorage.getItem('TOKEN') ) {
         body.TOKEN = localStorage.getItem('TOKEN')
      }
      
      // checkToken(body, isAuthenticated)
   })
   
</script>