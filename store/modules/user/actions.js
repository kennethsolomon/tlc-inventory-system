export default{
	// async getUser ({ commit }) {
	// 	const employees = await axios.get(`http://localhost:8000/api/employees`)
	// 	commit('SET_EMPLOYEES', employees.data)
	// }
	async getLogs ({ commit }) {
		const logs = await this.$axios.$get(`logs`)
		commit('SET_LOGS', logs)
		return logs
	},
}