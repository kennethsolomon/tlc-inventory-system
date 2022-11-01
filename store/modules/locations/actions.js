export default{
	async getLocations ({ commit }) {
		const locations = await this.$axios.$get(`locations`)
		commit('SET_LOCATIONS', locations)
	}
}