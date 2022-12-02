import { createApi, CreateApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./authApi";

export const accountsApi = createApi ({
    reducerPath: 'accounts',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_TRAVELSQUARED,
        prepareHeaders: (headers, { getState }) => {
            const selector = authApi.endpoints.getToken.select();
            const { data: tokenData } = selector(getState());
            if (tokenData && tokenData.access_token) {
                headers.set('Authorization', `Bearer ${tokenData.access_token}`);
            }
            return headers;
        }
    }),
    endpoints: builder => ({
        getAccounts: builder.query({
            query: () => '/api/accounts/',
            providesTags: ['AccountsList'],
        }),
        createAccount: builder.mutation({
            query: data => ({
                url: '/api/accounts/',
                body: {
                    username: data.username,
                    full_name: data.full_name,
                    email: data.email,
                    password: data.password
                },
                method: 'post',
            }),
            invalidatesTags: ['UserList'],
        }),
    }),
});

export const {
    useGetAccountsQuery,
    useCreateAccountMutation,
} = accountsApi;
