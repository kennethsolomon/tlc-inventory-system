import Vuex from 'vuex';
import user from './modules/user';
import snackbar from './modules/snackbar';

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      user,
      snackbar,
    }
  });
};

export default createStore