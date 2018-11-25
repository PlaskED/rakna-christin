import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import { persistedReducer } from './reducers/index'

const middlewares = applyMiddleware(thunk)
const store = createStore(persistedReducer, {}, middlewares)
const persistor = persistStore(store)

export { store, persistor }
