export default {
	SET_USER_STATUS(state, user_status) {
		console.log('mutation', user_status)
		state.user_status = user_status
	}
}