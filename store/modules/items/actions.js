export default{
	async getItems ({ commit }) {
		const items = await this.$axios.$get(`items`)
		commit('SET_ITEMS', items)
	},

	async postItem ({}, form) {
		const item = await this.$axios.$post(`update_or_create_item`, form)
		return item
	}
}