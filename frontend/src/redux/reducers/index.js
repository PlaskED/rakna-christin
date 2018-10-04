import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducerLogin from './login'
import reducerLogout from './logout'
import reducerUser from './user'
import reducerToken from './token'
import reducerGallery from './gallery'
import reducerUnread from './unread'
import reducerNotifications from './notifications'

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['reducerUser', 'reducerToken', 'reducerUnread']
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

const unreadPersistConfig = {
    key: 'reducerUnread',
    storage: storage,
    whitelist: ['unread']
}

const rootReducer = combineReducers({
    reducerLogin: reducerLogin,
    reducerLogout: reducerLogout,
    reducerUser: persistReducer(userPersistConfig, reducerUser),
    reducerToken: persistReducer(tokenPersistConfig, reducerToken),
    reducerGallery: reducerGallery,
    reducerUnread: persistReducer(unreadPersistConfig, reducerUnread),
    reducerNotifications: reducerNotifications,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export { persistedReducer }
