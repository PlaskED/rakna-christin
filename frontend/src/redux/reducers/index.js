import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducerLogin from './login'
import reducerLogout from './logout'
import reducerUser from './user'
import reducerToken from './token'
import reducerGallery from './gallery'

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['reducerUser', 'reducerToken']
}

const tokenPersistConfig = {
    key: 'reducerToken',
    storage: storage,
    whitelist: ['accessToken', 'refreshToken']
}

const userPersistConfig = {
    key: 'reducerUser',
    storage: storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    reducerLogin: reducerLogin,
    reducerLogout: reducerLogout,
    reducerUser: persistReducer(userPersistConfig, reducerUser),
    reducerToken: persistReducer(tokenPersistConfig, reducerToken),
    reducerGallery: reducerGallery,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export { persistedReducer }
