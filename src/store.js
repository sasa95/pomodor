import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer as authReducer } from './data/auth/reducer'
import { reducer as settingsReducer } from './data/settings/reducer'
import { reducer as labelsReducer } from './scenes/Timer/data/labels/reducer'
import { reducer as timerReducer } from './scenes/Timer/data/timer/reducer'
import { reducer as sessionsReducer } from './data/sessions/reducer'

const appReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  labels: labelsReducer,
  timer: timerReducer,
  sessions: sessionsReducer,
})

export default () => {
  const store = createStore(
    appReducer,
    composeWithDevTools(applyMiddleware(thunk))
  )
  return store
}
