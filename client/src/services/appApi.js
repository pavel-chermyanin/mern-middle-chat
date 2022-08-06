import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// define a service user a base URL

const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost: 5001'
    })
})