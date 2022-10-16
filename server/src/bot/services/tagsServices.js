
const {Api} =  require('./Api')

module.exports = {
  post (data) {
    const url = 'tags'
    return Api.post(url, data)
  },
  getItem ( id) {
    const url = 'tags'
    return Api.get(url + '/' + id)
  },
  getItems (query = {} ) {
    let url = 'tags'
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
    const url = 'tags'
    return Api.delete(url + '/' + id)
  },
  update ( { id, credentials }) {
    const url = 'tags'
    return Api.patch(`/${url}/${id}`, credentials)
  }

}