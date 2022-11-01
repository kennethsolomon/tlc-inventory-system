export default{
	async getItemCategories ({ commit }) {
		const item_categories = await this.$axios.$get(`item_categories`)
		commit('SET_ITEM_CATEGORIES', item_categories)
    console.log('actions getting cat')
	},
	async postItemCategory({}, form) {
		const item_category = await this.$axios.$post(`update_or_create_item_category`, form)
    return item_category
	}
}