import Parse from 'parse'

export default function ({redirect}) {
	if (Parse.User.current()) {
		console.log('login')
		redirect('/')
	}
}