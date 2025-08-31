import { configureStore } from '@reduxjs/toolkit'
import testReducer from './slices/testSlice.js' //testReducer is an arbitrary name
import authReducer from './slices/authSlice.js' //authReducer is an arbitrary name

import {apiSlice} from './slices/apiSlice.js'

// the store contains states and reducer
// each reducer is associated with an action => dispatch(incrementByAmount(2))
// each reducer property is described as => state: reducer
export const store = configureStore({

  reducer: {

    [apiSlice.reducerPath]: apiSlice.reducer, //this for api

    counter: testReducer, //counter is the state associated to all reducers contained in test reducer
    auth: authReducer
    
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware),

})