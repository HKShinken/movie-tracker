import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
}

export const authSlice = createSlice({

  name: 'authAction', //action prefix, can be different from state name defined into the store
  initialState,

  //reducers list 
  reducers: {

    setUsrCredentials: (state, action) => {
      // in this case "state"refers to "auth" state  defined in the store
      state.userInfo = action.payload
    },

    logout: (state, action) => {
        state.userInfo = null;
        localStorage.clear();
    },

  },
})

// Action creators are generated for each case reducer function
// when the reducer "setUsrCredentials" is imported, if called as setUsrCredentials(5), it returns and action object (plain JS object) along with type and payload
export const { setUsrCredentials, logout } = authSlice.actions

//will be imported from the store as reducer
export default authSlice.reducer