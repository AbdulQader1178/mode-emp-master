import { action, thunk, selector } from 'easy-peasy'
import { NETWORK_STATUS, APP_STATE } from '../../Constants'

const BaseModel = () => ({
  networkStatus: NETWORK_STATUS.NOT_STARTED,

  updateNetworkStatus: action((state, networkStatus) => {
    state.networkStatus = networkStatus
  }),

  mergeState: action((state, extra) => {
    Object.assign(state, extra)
  })
})

export default BaseModel
