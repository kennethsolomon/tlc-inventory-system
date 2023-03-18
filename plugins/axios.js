// Interceptor to check if cookie has expired
// export default function ({ $axios, $auth, redirect }) {
//   $axios.onError(error => {
//     if (error.response.status === 401) {
//       $auth.logout()

//       redirect('/login')
//     }
//   })
// }

export default function ({ $axios, store }) {
  $axios.onRequest(async (config) => {
    try {
      /// Store action to get or retrieve a token if it has expired
      const token = store.state.user.token.access_token;
      this.$axios.setToken(token, "Bearer");
    } catch (error) {
      console.log("Could not update token:", error);
    }
    return config;
  });
}
