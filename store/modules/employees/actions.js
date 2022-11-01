export default{
	async getEmployees ({ commit }) {
		const employees = await this.$axios.$get(`employees`)
		commit('SET_EMPLOYEES', employees)
	}
}