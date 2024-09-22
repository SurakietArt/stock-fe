const mutations = {
   
   setFullname (state, payload) {
		state.fullname = payload
	},
	setProducts (state, payload) {
		state.products = payload
	},
	setAmountsOf (state, payload) {
	  state.amountsOf.product = payload.product
	  state.amountsOf.category = payload.category
	},
	setDeleteProduct (state, id) {
	   state.deleteProduct.id = id
	},
	setUpdateProduct (state, payload) {
		const body = state.updateProduct
		//Binding data
		body.id = payload.id
	  body.name = payload.name
	  body.price_per_unit = payload.price_per_unit
	  body.category_id = payload.category_id
	  body.amount = payload.amount
	  body.unit_id = payload.unit_id
	},
	setCurrentCategory (state, payload) {
	   state.currentCategory = payload
	},
	setKeyword (state, payload) {
	   state.keyword = payload
	}
}

export default mutations