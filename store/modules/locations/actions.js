export default{
	async getLocations ({ commit }) {
		const locations = await this.$axios.$get(`locations`)
		commit('SET_LOCATIONS', locations)
	},
	async postLocation ({}, form) {
		const location = await this.$axios.$post(`update_or_create_location`, form)
    return location
	}
}