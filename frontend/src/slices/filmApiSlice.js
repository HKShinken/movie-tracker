import { apiSlice } from "./apiSlice.js"

const allApi = apiSlice.injectEndpoints({

  endpoints: (build) => ({

        getFilms: build.query({
            query: (data) => ({
                url: `/api/film/filmpage/` + data.keyword,
                method: 'GET',
            }),
        }),

        //overrideExisting: false,
    })
})

export const { useGetFilmsQuery } = allApi

