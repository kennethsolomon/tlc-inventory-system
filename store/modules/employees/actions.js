import axios from 'axios';
export default{
	async getEmployees ({ commit }) {
		const employees = await axios.get(`http://localhost:8001/api/employees`)
		commit('SET_EMPLOYEES', employees.data)
	}
}