import { ITag } from '../constants/tag'
import { AxiosResponse } from 'axios'
import Api from './Api'

const url = 'tags'

const tagServices = {
  getItems  (query: { [key: string]: string} = {}): Promise<ITag[]> {
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

export default tagServices

