import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducerLogin from "./login";
import reducerToken from "./token";

const rootPersistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['reducerLogin']
}

const loginPersistConfig = {
    key: 'reducerLogin',
    storage: storage,
    whitelist: ['accessToken', 'refreshToken', 'user']
}

const rootReducer = combineReducers({
    reducerLogin: persistReducer(loginPersistConfig, reducerLogin),
    reducerToken: reducerToken,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export { persistedReducer };
