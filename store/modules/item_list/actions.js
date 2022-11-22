export default{
	async getItemList ({ commit }) {
		const item_list = await this.$axios.$get(`item_list`)
		commit('SET_ITEM_LIST', item_list)
	},

	async postItemList ({}, form) {
		const item_list = await this.$axios.$post(`item_list_update`, form)
		return item_list
	}
}