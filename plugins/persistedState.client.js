import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
	createPersistedState({
	storage: window.sessionStorage,
	paths: [
		'user',
		'employees',
		'item_categories',
		'item_status',
		'items',
		'locations',
		'item_list',
		'transactions',
		'loans',
	]
  })(store)
}