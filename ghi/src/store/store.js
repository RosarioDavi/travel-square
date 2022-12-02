import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from './authApi';
import { accountSlice } from './accountSlice';


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [accountSlice.reducerPath]: accountSlice.reducer,
    },
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(authApi.middleware)
    },
});

setupListeners(store.dispatch)
