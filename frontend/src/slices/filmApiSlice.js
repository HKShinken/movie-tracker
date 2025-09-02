import { apiSlice } from "./apiSlice.js"

const allApi = apiSlice.injectEndpoints({

  endpoints: (build) => ({

        getFilms: build.query({
            
            query: () => ({
                url: `/api/film/homepage/`,
                method: 'GET',
            }),

        }),
        //overrideExisting: false,
    })
})

export const { useGetFilmsQuery } = allApi

