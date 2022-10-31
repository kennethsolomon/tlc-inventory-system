import Vuex from 'vuex';
import user from './modules/user';
import snackbar from './modules/snackbar';
import items from './modules/items';
import item_categories from './modules/item_categories';
import locations from './modules/locations';
import employees from './modules/employees';
import status from './modules/status';

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      employees,
      item_categories,
      items,
      locations,
      user,
      snackbar,
      status
    }
  });
};

export default createStore