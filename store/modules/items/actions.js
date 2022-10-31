import axios from 'axios';
export default{
	async getItems ({ commit }) {
		const items = await axios.get(`http://localhost:8001/api/items`)
		commit('SET_ITEMS', items.data)
	}
}