export default function ({ store, redirect }) {
  if (store.getters.getUser.role === 'Staff') {
    return redirect('/')
  }
}