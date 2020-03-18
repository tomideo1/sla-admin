import Api from "@/utils/Api.js"

export const  login = async ({ commit }, payload) => {
	let res = await Api.post('/admin/login', payload)

	if (res.status == 200) {
		commit('setToken', res.data.token)
		commit('setUserDetails', res.data.admin)
		return true
	}else {
		return res
	}

}
