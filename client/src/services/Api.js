import  axios from 'axios'
// import { SECRET_API_KEY } from '$env/static/private'; //here
const Api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 30000

})

// check req/res before they are handled
// REQ
Api.interceptors.request.use(
  (request) => {
    return request
  },
  (error) => {
    console.log('error token')

    return Promise.reject(error)
  }
)
// RES
Api.interceptors.response.use(
  (response) => {
    const { data } = response
    return data
  },
  (error) => {

    const message = error
    console.log(error)
    return Promise.reject(message)
  }
)
export default Api
