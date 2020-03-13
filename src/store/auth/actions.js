import Api from "@/utils/Api.js"

export const async login = ({ commit }, payload) => {

	return Api.post('/api/login', payload)
	// set JWT
	// set userData
	// return Promise.resolve()
}