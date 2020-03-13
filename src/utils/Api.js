import axios from "axios"

const Api = axios.create({
	baseURL: process.env.VUE_APP_API
})

export default Api