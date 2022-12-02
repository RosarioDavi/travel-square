import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from './authApi';
import { accountsApi } from './accountsApi';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [accountsApi.reducerPath]: accountsApi.reducer,
    },
    middleware: getDefaultMiddleware => {
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(accountsApi.middleware)
    },
});

setupListeners(store.dispatch)
