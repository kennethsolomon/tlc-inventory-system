export default async function ({ store, from }) {
  const isInitialPageLoad = from.name === "login";

  if (isInitialPageLoad) {
    await Promise.all([
      // store.dispatch('getEmployees'),
      // store.dispatch('getItemCategories'),
      // store.dispatch('getItems'),
      // store.dispatch('getLocations'),
      // store.dispatch('getItemStatus'),
      // store.dispatch('getItemList'),
      // store.dispatch('getItemTrash'),
      // store.dispatch('getTransactionTrash'),
      // store.dispatch('getLoanTrash'),
    ]);
  }
}
