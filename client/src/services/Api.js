/* eslint-disable dot-notation */
/* eslint-disable quote-props */
/* eslint-disable no-undef */
/* eslint-disable no-console */
require('dotenv').config();
const  axios = require('axios')
const Api = axios.create({
  baseURL: process.env.WALLET_API,
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
    if (response.data['hydra:member']) {
      return {
        data: data['hydra:member'],
        totalItems: data['hydra:totalItems']
      }
    } else {
      console.log('there are usual response')
      return { data }
    }
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

exports.Api = Api