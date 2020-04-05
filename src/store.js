import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as authReducer } from './data/auth/reducer'
import { reducer as settingsReducer } from './data/settings/reducer'
import { reducer as labelsReducer } from './data/labels/reducer'
import { reducer as timerReducer } from './scenes/Timer/reducer'
import { reducer as statsReducer } from './scenes/Stats/reducer'

const appReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  labels: labelsReducer,
  timer: timerReducer,
  stats: statsReducer,
})

export default () => {
  const store = createStore(
    appReducer,
    composeWithDevTools(applyMiddleware(thunk))
  )
  return store
}
