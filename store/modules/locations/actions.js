import axios from 'axios';
export default{
	async getLocations ({ commit }) {
		const locations = await axios.get(`http://localhost:8001/api/locations`)
		commit('SET_LOCATIONS', locations.data)
	}
}