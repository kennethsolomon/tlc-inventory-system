import Parse from 'parse'
export default function ({ store, redirect, route }) {
  // If the user is not authenticated
  if (!Parse.User.current()) {
    return redirect(`/login`);
  }
}