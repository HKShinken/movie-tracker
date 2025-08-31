import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const testSlice = createSlice({
  name: 'actionCounter', //action prefix, can be different from key of the state defined into the store
  initialState,

  reducers: {

    incrementByAmount: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += action.payload
    },

  },
})

// Action creators are generated for each case reducer function
// when the reducer "incrementByAmount" is imported, if called as incrementByAmount(5), it returns and action object (plain JS object) along with type and payload
export const { incrementByAmount } = testSlice.actions

//will be imported from the store as reducer
export default testSlice.reducer