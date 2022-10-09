import Parse from 'parse'
export default function ({ store, redirect }) {
  // If the user is authenticated redirect to home page
  if (Parse.User.current()) {
    return redirect('/')
  }
}
