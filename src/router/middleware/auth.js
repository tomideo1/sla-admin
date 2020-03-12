export default function({ next }) {
	if(true) {
		console.log("NOT_LOGGED_IN")
		return next({
			name: 'login'
		})
	}

	next()
}
