//Actions
import profile from '../api/account/profile.js'
import products from '../api/products/products.js'
import searchProducts from '../api/products/search.js'

const actions = {
   
   // getProfile({ commit }) {
   //    //Get token
   //    const TOKEN = localStorage.getItem('TOKEN')
   //
   //    const setFullname = res => {
   //       //Check the response
   //       if ( res.data.status === 200 ) {
   //          commit('setFullname', res.data.results.fullname)
   //          commit('setAmountsOf', {
   //             product: res.data.results.products,
   //             category: res.data.results.categorys
   //          })
   //       }
   //    }
   //
   //    profile(TOKEN, setFullname)
   // },
   
   getProducts({ commit }) {
      //Get token
      const TOKEN = localStorage.getItem('TOKEN')

      const setProducts = res => {
         //Check the response
         if ( res.status === 200 ) {
            commit('setProducts', res.data)
         }
      }

      products(TOKEN, setProducts)
   },
   
   getProductsBy({ commit }, payload) {
      
      const getAndSet = (res, data) => {
         if (res) commit('setProducts', data.results)
      }
      
      //alert(JSON.stringify(payload))
      searchProducts(payload, getAndSet)
   }
}

export default actions