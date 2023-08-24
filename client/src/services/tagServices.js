import Api from './Api'

const url = 'tags'

export default {
  getItems  (query = '') {
    let adjustedUrl = url
    if (query) {
      adjustedUrl += '?'
      Object.keys(query)
      .forEach((key) => {
        if (query[key]) {
          adjustedUrl += key + '=' + query[key] + '&'
        }
      })
    }
    return Api.get(adjustedUrl)
  },

}
