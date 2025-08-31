import { apiSlice } from "./apiSlice.js"

const allApi = apiSlice.injectEndpoints({

  endpoints: (build) => ({

        getFilms: build.query({
            
            query: ( data ) => ({
                url: `/api/films/all`,
                method: 'GET',
            }),



            
        }),
        overrideExisting: false,
    })
})

export const { usGetFilmsQuery } = allApi

