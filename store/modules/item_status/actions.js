import axios from 'axios';
export default{
	async getItemStatus ({ commit }) {
		const item_status = await axios.get(`http://localhost:8001/api/item_status`)
		commit('SET_ITEM_STATUS', item_status.data)
	}
}