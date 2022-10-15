export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('hello', (msg) => console.log(`Hello ${msg}!`))

  // Sample Global Helper
  inject('add', (num1, num2) => {
    console.log(num1 + num2)
  })


  // Snackbars
//   inject('unSetSnackbar', (store) => {
//     store.commit('SET_SNACKBAR', {
//           snackbar: {
//             status: false,
//             text: store.state.snackbar.text,
//             timeout: 2000,
//             color: 'error',
//           },
//     })
//   })

  inject('convertToCurrency', (money) => {
	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'PHP',
	});
    return formatter.format(money);
  })

  inject('capitalizeFirstLetter', (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  })
}