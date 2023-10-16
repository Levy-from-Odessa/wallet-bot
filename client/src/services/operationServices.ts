import { IOperationRequest, IOperationsResponse } from '../constants/operation';
import { AxiosResponse } from 'axios'
import { IOperation } from '../constants/operation'
import Api from './Api'

const url = 'operations'



const operationServices = {
  post (data: IOperationRequest): Promise<IOperation> {
    return Api.post(url, data)
  },
  getItem (id: number): Promise<AxiosResponse<IOperation>> {
    return Api.get(url + '/' + id)
  },
  total (id: number) {
    return Api.get(url + '/total')
  },
  getItems  (query: { [key: string]: string | string[]} = {}): Promise<IOperationsResponse> {
    
    let adjustedUrl = url
    if (query) {
      adjustedUrl += '?'
      Object.keys(query)
      .forEach((key) => {
        if (Array.isArray(query[key])) {
          adjustedUrl += (query[key] as string[]).reduce((acc, item, index) => {
            return acc += key + `[${index}]=${item}&`
          }, '')
          console.log(adjustedUrl);
          
        }
        if (query[key]) {
          adjustedUrl += key + '=' + query[key] + '&'
        }
      })
    }
    return Api.get(adjustedUrl)
  },
  deleteItem (id: number): Promise<AxiosResponse<string>> {
    return Api.delete(url + '/' + id)
  },
  update ( { id, credentials }: {id: number, credentials: IOperation}): Promise<AxiosResponse<IOperation>>{
    return Api.patch(`/${url}/${id}`, credentials)
  }

}

export default operationServices
