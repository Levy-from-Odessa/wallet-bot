import Api from './Api'

const url = 'operations'

export default {
  post (data) {
    return Api.post(url, data)
  },
  getItem ( id) {
    return Api.get(url + '/' + id)
  },
  total (id) {
    return Api.get(url + '/' + 'total')
  },
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
  deleteItem ( id) {
    return Api.delete(url + '/' + id)
  },
  update ( { id, credentials }) {
    return Api.patch(`/${url}/${id}`, credentials)
  }

}
