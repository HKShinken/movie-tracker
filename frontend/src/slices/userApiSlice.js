import { apiSlice } from "./apiSlice.js"

const allApi = apiSlice.injectEndpoints({

  endpoints: (build) => ({

        login: build.mutation({
            
            query: ( data ) => ({
                url: `/api/users/login`,
                method: 'POST',
                body: data,
            }),



            
        }),
        overrideExisting: false,
    })
})

export const { useLoginMutation } = allApi

/* 
useMutation returns a tuple. 
The first item in the tuple is the "trigger" function and the second element contains 
an object with status, error, and data.

Unlike the useQuery hook, the useMutation hook doesn't execute automatically. 
To run a mutation you have to call the trigger function returned as the first tuple value from the hook.
*/