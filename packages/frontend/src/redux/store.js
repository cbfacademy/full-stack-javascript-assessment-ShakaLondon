import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import appStateSlice from './slices/app-state-slice'
import { thunk } from 'redux-thunk'
import storageSession from 'redux-persist/lib/storage'

function configureAppStore( preloadedState ) {
    const persistConfig = {
      key: 'root',
      storage: storageSession,
    }

    const combinedReducer = combineReducers({ 
      appState: appStateSlice 
    })
  
    const persistedReducer = persistReducer(persistConfig, combinedReducer)
  
    const store = configureStore({
      reducer: persistedReducer,
      middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(thunk),
      preloadedState,
      devTools: process.env.NODE_ENV !== 'production',
    })
  
    return store
  }
  
  export const store = configureAppStore({})
  export const persistor = persistStore(store)