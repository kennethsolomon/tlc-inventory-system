export default {
	SET_ITEMS(state, items) {
		state.items = items
	},

	SET_ITEM_TRASH(state, item_trash) {
		state.item_trash = item_trash
	},

	SET_TRANSACTIONS(state, transactions) {
		state.transactions = transactions
	},

	SET_TRANSACTION_TRASH(state, transaction_trash) {
		state.transaction_trash = transaction_trash
	},

	SET_LOANS(state, loans) {
		state.loans =  loans
	},

	SET_LOAN_TRASH(state, loan_trash) {
		state.loan_trash =  loan_trash
	},
}
