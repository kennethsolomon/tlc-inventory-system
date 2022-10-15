import Vuex from 'vuex';
import user from './modules/user';
import snackbar from './modules/snackbar';
import item from './modules/item';
import category from './modules/category';
import location from './modules/location';
import received_by from './modules/received_by';

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      user,
      snackbar,
      item,
      category,
      location,
      received_by,
    }
  });
};

export default createStore