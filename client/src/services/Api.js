import  axios from 'axios'
import { env } from '$env/dynamic/private';
const Api = axios.create({
  baseURL: env.WALLET_API,
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
    // if (
    //   error.response &&
    //   error.response.status &&
    //   error.response.status === 401 &&
    //   error.response.data.message !== 'Bad credentials'
    // ) {
    //   window.location.href = '/login'
    // }

    const message = error
    global.console.log(error)
    return Promise.reject(message)
  }
)
export default Api
