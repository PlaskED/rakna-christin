import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducerLogin from './login'
import reducerUser from './user'
import reducerToken from './token'

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['reducerLogin', 'reducerUser']
}

const loginPersistConfig = {
    key: 'reducerLogin',
    storage: storage,
    whitelist: ['accessToken', 'refreshToken']
}

const userPersistConfig = {
    key: 'reducerUser',
    storage: storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    reducerLogin: persistReducer(loginPersistConfig, reducerLogin),
    reducerUser: persistReducer(userPersistConfig, reducerUser),
    reducerToken: reducerToken,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export { persistedReducer }
