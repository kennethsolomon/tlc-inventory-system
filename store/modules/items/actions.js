export default{
	async getItems ({ commit }) {
		const items = await this.$axios.$get(`items`)
		commit('SET_ITEMS', items)
	},

	async postItem ({}, form) {
		const item = await this.$axios.$post(`update_or_create_item`, form)
		return item
	},

	// Transfer / Transaction
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

	// Loan

	async postLoanProperty ({}, form) {
		const loan_property = await this.$axios.$post(`loan_property`, form)
		return loan_property
	},

	async getLoans ({ commit }) {
		const loans = await this.$axios.$get(`loan_list`)
		commit('SET_LOANS', loans)
		return loans.data
	},

	async destroyLoans ({}, id) {
		const loans = await this.$axios.$delete(`delete_loan/${id}`)
		return loans
	},

}