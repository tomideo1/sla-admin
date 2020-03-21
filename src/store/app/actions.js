import Api from "@/utils/Api.js"

export const getAllCourses = async ({commit}) => {
	let res = await Api.get(`/course/list`, true)

	if(res.status == 200) {
		commit("setCourses", res.data.data)
	}else {
		return res;
	}
}