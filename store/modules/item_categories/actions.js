import axios from 'axios';
export default{
	async getItemCategories ({ commit }) {
		const item_categories = await axios.get(`http://localhost:8001/api/item_categories`)
		commit('SET_ITEM_CATEGORIES', item_categories.data)
	}
}