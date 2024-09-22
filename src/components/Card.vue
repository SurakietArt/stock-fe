<template>
   <section id="card" class="s-container">
      <!-- Section title -->
      <div class="mt-3 text-xl flex justify-between items-center">
         <p class="font-medium">Your Products</p>
         <i class="fa fa-chevron-down"></i>
      </div>
      
      <!-- State empty card -->
      <div class="mt-12" v-if="cards.length <= 0">
         <p>Product not found, try to add new product or change the category 🙏🏻</p>
      </div>
      
      <!-- Card wrapper -->
      <div class="card-wrapper">
         <template v-for="(card, index) in cards" :key="index">
            <div class="card flex flex-wrap flex-column flex-stretch show-slide">
               <img load="lazy" class="w-full" :src="card.image_product" :alt="card.image_product" />
               <div class="pt-2 self-end pb-6 px-3 bg-white">
                  <strong>{{ card.name }}</strong>
                  <div class="flex mt-2">
                     <span>
                        <i class="mr-1 fas fa-dollar-sign"></i>
                        <small>{{ card.price_per_unit.toLocaleString() }}</small>
                     </span>
                     <span>
                        <i class="mr-1 fas fa-cubes ml-3"></i>
                        <small>{{ card.amount }} {{ card.unit ? card.unit.name : '' }}</small>
                     </span>
                  </div>
                  <div class="mt-4 w-full flex justify-between">
                     <span @click="btnUpdateProduct(
                        card.id,
                        card.name,
                        card.price_per_unit.toLocaleString(),
                        card.category.id,
                        card.amount,
                        card.unit.id
                     )" class="btn-active-label duration-300 block w-8/12 rounded bg-prussian-blue text-center text-sm py-1 text-gray-100">Update</span>
                     <span @click="btnDeleteProduct(card.id)" class="btn-active-icon duration-300 block w-3/12 rounded bg-gray-500 text-gray-100 flex justify-center items-center">
                        <i class="fa fa-trash text-sm"></i>
                     </span>
                  </div>
               </div>
            </div>
         </template>
      </div>
   </section>
</template>

<style scoped>
   
   @import "../style/components/card.css"
   
</style>

<script setup>
   
   import { reactive } from 'vue'
   import { useStore } from 'vuex'
   import { useRouter } from 'vue-router'
   
   //The props
   defineProps({
      cards: {
         default: []
      }
   })
   
   //init
   const store = useStore()
   const router = useRouter()
   const emits = defineEmits(['btnDeleteProduct'])
   
   //Save data about table name and primary key
   const deleteModalObj = reactive({
      tableName: '',
      primaryKey: ''
   })
   
   //Handler for button update
   const btnUpdateProduct = (id, name, price_per_unit, category_id, amount, unit_id) => {
     //Save into state
     store.commit('setUpdateProduct', {
         id: id,
         name: name,
         price_per_unit: price_per_unit,
         category_id: category_id,
         amount: amount,
         unit_id: unit_id
      })
      //Push router to update views
      setTimeout(() => {
         router.push({ name: 'update' })
      }, 500)
   }
   
   //Handler for button delete
   const btnDeleteProduct = (id) => {
      
      //Passing data product into modal with save data into state
      store.commit('setDeleteProduct', id)
      
      setTimeout(() => {
         emits('btnDeleteProduct')
      }, 500)
   }
   
</script>