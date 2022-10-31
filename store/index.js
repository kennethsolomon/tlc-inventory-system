import Vuex from 'vuex';
import user from './modules/user';
import snackbar from './modules/snackbar';
import item from './modules/item';
import category from './modules/category';
import location from './modules/location';
import employees from './modules/employees';
import status from './modules/status';

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      employees,
      user,
      snackbar,
      item,
      category,
      location,
      status
    }
  });
};

export default createStore