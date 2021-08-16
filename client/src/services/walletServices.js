const {Api} =  require('./Api')

const url = 'operations'
module.exports = {
  post (data) {
    console.log(Api);
    return Api.post(url, data)
  },
  getItem ( id) {
    return Api.get(url + '/' + id)
  },
  getItems ( {query}) {
    if (query) {
      url += '?'
      Object.keys(query)
      .forEach((key) => {
        if (query[key]) {
          url += key + '=' + query[key] + '&'
        }
      })
    }
    console.log(url);
    return Api.get(url)
  },
  deleteItem ( id) {
    return Api.delete(url + '/' + id)
  },
  update ( { id, credentials }) {
    return Api.patch(`/${url}/${id}`, credentials)
  }

}