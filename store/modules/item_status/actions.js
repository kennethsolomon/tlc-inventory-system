export default{
	async getItemStatus ({ commit }) {
		const item_status = await this.$axios.$get(`item_status`)
		commit('SET_ITEM_STATUS', item_status)
	}
}