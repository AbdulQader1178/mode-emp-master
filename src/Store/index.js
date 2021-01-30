import model from './Models'
import ConfigureStore from './ConfigureStore'
import Api from '../Services/Api'

let store = null
let apiClient = null

const createStore = () => {
  apiClient = Api.createApiClient()
  store = ConfigureStore(model, apiClient)
  return store
}

// 👇 Kickoff our StoreCreater and store instance

export default createStore
export { store as StoreService, apiClient as ApiService }
