export default {
  // async getUser ({ commit }) {
  // 	const employees = await axios.get(`http://localhost:8000/api/employees`)
  // 	commit('SET_EMPLOYEES', employees.data)
  // }
  async getLogs({ commit }) {
    const logs = await this.$axios.$get(`logs`);
    commit("SET_LOGS", logs);
    return logs;
  },

  async getIdToken({ commit }) {
    const logs = await this.$axios.$get(`logs`);
    commit("SET_LOGS", logs);
    return logs;
  },

  async getMaintenances({ commit }) {
    const maintenance = await this.$axios.$get(`maintenance`);
    commit("SET_MAINTENANCE", maintenance);
    return maintenance;
  },

  async updateUser({}, form) {
    const user = await this.$axios.$post(`update-or-create-user`, form);
    return user;
  },
};
