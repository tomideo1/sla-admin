import Api from "@/utils/Api.js"

export const  login = async ({ commit }, payload) => {
	
	let res = await Api.post('/api/login', payload)
	if (res.status == 200) {
		// set JWT
		// set userData
		return res
	}else {
		return res
	}
}