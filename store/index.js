import Vuex from 'vuex';
import user from './modules/user';
import snackbar from './modules/snackbar';
import item from './modules/item';
import item_categories from './modules/item_categories';
import location from './modules/location';
import employees from './modules/employees';
import status from './modules/status';

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      employees,
      item_categories,
      user,
      snackbar,
      item,
      location,
      status
    }
  });
};

export default createStore