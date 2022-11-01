export default{
	async getEmployees ({ commit }) {
		const employees = await this.$axios.$get(`employees`)
		commit('SET_EMPLOYEES', employees)
	},

	async postEmployee ({}, form) {
		const employee = await this.$axios.$post(`update_or_create_employee`, form)
		return employee
	}
}