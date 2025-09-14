import { apiSlice } from "./apiSlice.js"

const allApi = apiSlice.injectEndpoints({

  endpoints: (build) => ({

        getFilms: build.query({
            query: (data) => ({
                url: `/api/film/filmpage/` + data.keyword,
                method: 'GET',
            }),
        }),

        getFilmReviewData: build.query({
            query: (data) => ({
                url: `/api/film/data/` + data.imdbId,
                method: 'GET',
            }),
        }),

        //overrideExisting: false,
    })
})

export const { useGetFilmsQuery, useGetFilmReviewDataQuery } = allApi

