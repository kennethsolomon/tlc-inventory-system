export default{
	async getItems ({ commit }) {
		const items = await this.$axios.$get(`items`)
		commit('SET_ITEMS', items)
	}
}