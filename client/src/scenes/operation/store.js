
const state = {
	currency: '',
	price: 0, 
	tags: [],
	type: ''
}

const mutations = {
	SET_CURRENCY(state, currency){
		Object.assign(state, currency)
	},
	SET_PRICE(state, price){
		Object.assign(state, price)
	}
}


module.exports = (ctx) => {
	state,
	mutations
}