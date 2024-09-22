import { createStore } from 'vuex'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

const store = createStore({
	state() {
		return {
			fullname: '',
			products: '',
			amountsOf: {
			  product: 0,
			  category: 0
			},
			deleteProduct: {
				id: '',
			},
			updateProduct: {
			  id: '',
			  name: '',
				price_per_unit: '',
				category_id: '',
				amount: '',
				unit_id: '',
			},
			currentCategory: 'All',
			keyword: ''
		}
	},
	getters,
	mutations,
	actions
})

export default store