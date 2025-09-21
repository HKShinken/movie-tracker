import { apiSlice } from "./apiSlice.js"

const allApi = apiSlice.injectEndpoints({

  endpoints: (build) => ({

        getUserList: build.query({
            query: (data) => ({
                url: `/api/admin/userlist/${data.page}`,
                method: 'GET'
            }),
        }),

        deleteUser: build.mutation({
            query: (data) => ({
                url: `/api/film/data/`,
                method: 'POST',
                body: data
            }),
        }),

        modifyUser: build.mutation({
            query: (data) => ({
                url: `/api/admin/moduser/`,
                method: 'PUT',
                body: data
            }),
        }),

        

        //overrideExisting: false,
    })
})
//modifyUser
export const { useGetUserListQuery, useDeleteUserMutation, useModifyUserMutation } = allApi

