export default{
	async getItems ({ commit }) {
		const items = await this.$axios.$get(`items`)
		commit('SET_ITEMS', items)
	},

	async postItem ({}, form) {
		const item = await this.$axios.$post(`update_or_create_item`, form)
		return item
	},

	async postTransferProperty ({}, form) {
		const transfer_property = await this.$axios.$post(`transfer_property`, form)
		return transfer_property
	},

	async getTransactions ({ commit }) {
		const transactions = await this.$axios.$get(`transaction_list`)
		commit('SET_TRANSACTIONS', transactions)

		return transactions.data
	},

	async destroyTransactions ({}, id) {
		const transactions = await this.$axios.$delete(`delete_transaction/${id}`)
		return transactions
	},


}