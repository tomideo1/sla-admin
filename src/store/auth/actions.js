import Api from "@/utils/Api.js"

export const  login = async ({ commit }, payload) => {

	return await Api.post('/api/login', payload)
	// set JWT
	// set userData
	// return Promise.resolve()
}