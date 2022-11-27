export default {
  getItems: state => state.items,
  getItemTrash: state => state.item_trash,
  getTransactions: state => state.transactions,
  getTransactionTrash: state => state.transaction_trash,
  getLoans: state => state.loans,
  getLoanTrash: state => state.loan_trash,
}