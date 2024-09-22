<template>
   <section class="mt-20 s-container">
      <slot name="caption-form"></slot>
      
      <!-- alert -->
      <div v-if="isFailed" class="px-2 py-3 bg-red-300 mb-4 rounded-xl text-gray-50">
         <p>Action failed !!</p>
      </div>
      
      <!-- Form -->
      <form v-on:submit.prevent="submitForm()" class="form-wrapper mt-10" enctype="multipart/form-data">
         <!-- Image of product -->
         <div class="show-slide mb-5 flex items-end gap-5">
            <img class="preview-item" :src="previewImg" width="100" alt="product" />
            <input ref="file" class="bg-gray-200 border border-gray-400 py-3 px-4 rounded-xl" @change="showPreview" name="file" type="file"/>
         </div>
         
         <!-- Name of product -->
         <div class="show-slide form-input mb-5">
            <input v-model="form.name" type="text" placeholder="ชื่อสินค้า" />
         </div>
         <!-- Price of product -->
         <div class="show-slide form-group mb-3 gap-3">
            <span class="btn-item bg-prussian-blue">
               <strong>บาท</strong>
            </span>
            <input v-model="form.price_per_unit" class="w-10/12" type="number" placeholder="ราคาต่อหน่วย" />
         </div>
         <!-- Category of product -->
         <div class="show-slide mb-3">
            <select v-model="form.category_id" class="select-form">
               <option selected="true" value="0">เลือกหมวดหมู่</option>
              <template v-for="(category, index) in categoryArr" :key="index">
                 <option class="px-3" :value="category.id">{{ category.name }}</option>
              </template>
            </select>
         </div>
         <!-- Stock of product -->
         <div class="show-slide form-input mb-3">
            <input v-model="form.amount" type="number" placeholder="จำนวน" />
         </div>
         <!-- Unit per price product -->
         <div class="show-slide mb-3">
            <select v-model="form.unit_id" class="select-form">
               <option selected="" value="0">เลือกหน่วย</option>
              <template v-for="(unit, index) in unitArr" :key="index">
                <option class="px-3" :value="unit.id">{{ unit.name }}</option>
              </template>
            </select>
         </div>
         <!-- Form action -->
         <div class="show-slide btn-form mt-8 mb-3 text-xl">
            <button :disabled="isFormValid.length > 0" class="bg-prussian-blue" type="submit">
               <span class="btn-active-label bg-prussian-blue duration-300 text-center rounded text-gray-100 w-5/12  px-2 py-1">
                  <template v-if="!isLoad && !loadSuccess">
                     Submit
                  </template>
                  <template v-else-if="isLoad && !loadSuccess">
                     <i class="spinner fas fa-spinner"></i>
                  </template>
                  <template v-else>
                     <i class="fa fa-check"></i>
                  </template>
            </span>
            </button>
         </div>
      </form>
   </section>
</template>

<script setup>
   
   import { ref, watch, reactive, computed, onMounted } from 'vue'
   import { useRoute } from 'vue-router'
   import { useStore } from 'vuex'
   import upload from '../api/products/upload.js'
   import createProduct from '../api/products/create.js'
   import update from '../api/products/update.js'
   import removeFile from '../api/products/removeFile.js'
   import categories from '../api/category/categories.js'
   import units from "../api/units/units";
   
   //Init router
   const route = useRoute()
   
   //Init store
   const store = useStore()
   
   //get current route name
   const currentRoute = computed(() => {
      return route.name
   })
   
   //Get state updateProduct
   const body = computed(() => {
      return store.getters.updateProduct
   })
   
   //indicator 
   const isForUpdate = ref(false)
   
   //List of category
   const categoryArr = ref([]);
   const unitArr =ref([])

   onMounted(() => {
      
      //If currentRoute === 'update' , binding form with state
      if (currentRoute.value === 'update') {
        isForUpdate.value = true
         previewImg.value = body.value.image_product
         form.value.id = body.value.id
         form.value.name = body.value.name
         form.value.price_per_unit = body.value.price_per_unit
         form.value.category_id = body.value.category_id
         form.value.amount = body.value.amount
         form.value.unit_id = body.value.unit_id
      }
     //Get categorys from server and render to options
     const getCategory = (status, res) => {
       if (status) {
         categoryArr.value = res.data;
       } else {
         categoryArr.value = [];
       }
     };
      const getUnits = (status, res) =>{
        if (status) {
          unitArr.value = res.data;
        } else {
          unitArr.value = [];
        }
      }

     //Get category from server
     categories(getCategory)
     units(getUnits)
   })

   //Variabel for animated
   const isLoad = ref(false)
   const loadSuccess = ref(false)
   const isFailed = ref(false)
   
   //form use for create product
   const form = ref({
      price_per_unit: null,
      category_id: 0,
      amount: '',
      unit_id: 0,
     // image_product: '', // TODO: add image product to API
   })

   //Form validation
   let isFormValid = ref([false])
   watch(form.value, () => {
      isFormValid.value = Object.values(form.value).filter(val => val === '' || val === null || val === 0 || val === '0')
   })

   //Get file
   let file = ref(null)
   
   //Image preview
   let previewImg = ref('/product.jpg')
   
   const showPreview = event => {
      
      form.value.image_product = 'true'
      
      //Init reader
      const reader = new FileReader()
      reader.onload = () => {
         previewImg.value = reader.result  
      }
      
      reader.readAsDataURL(event.target.files[0])
   }
   
   // Form actions 
   const submitForm = () => {
      
      isLoad.value = false
      loadSuccess.value = false
      setTimeout(() => {
         
         //Init FormData
         const formData = new FormData()
         // formData.append('file', file.value.files[0]) // TODO: add image to backend API
         isLoad.value = true
         
         const successLoad = res => {
            if (res.status === 200 || res.status === 201) {
               setTimeout(() => {
                  loadSuccess.value = true   
               }, 800)
            } else {
               setTimeout(() => {
                  isFailed.value = true
               }, 500)
            }
         }

        // const product = res => { // TODO: add image to API backend.
        //
        //     //If upload success
        //     if ( res.data.status === 200 ) {
        //        form.value.image_product = res.data.results.path
        //        //Create product
        //        createProduct(form.value, successLoad)
        //     }
        //  }

        if (!isForUpdate.value) {
          createProduct(form.value, successLoad)
        } else {
          update(form.value, successLoad, body.value.id)
        }
         
         //upload file // TODO: add image to API backend
         // if ( !isForUpdate.value ) upload(formData ,product)
         // else {
         //    if ( form.value.image_product === 'true' ) {
         //       //If user upload new file
         //       upload(formData, updateProduct)
         //    } else {
         //       form.value.id_product = body.value.id_product
         //       update(form.value, successLoad)
         //    }
         // }
      
      }, 500)
   }
   
</script>

<style scoped>
   
   .preview-item {
      @apply rounded-xl border border-gray-400 ;
   }
   
</style>