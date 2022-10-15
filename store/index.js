import Vuex from 'vuex';
import user from './modules/user';
import snackbar from './modules/snackbar';
import item from './modules/item';
import category from './modules/category';

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      user,
      snackbar,
      item,
      category
    }
  });
};

export default createStore