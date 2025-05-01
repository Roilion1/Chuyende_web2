import { configureStore } from '@reduxjs/toolkit'
// import cartReducer from './cartSlice'
// import useReducer from './userSlice'
import Reducer from './../store/Reducer';

export default configureStore({
    reducer: {
        // cart: cartReducer,
        // user: useReducer
        Reducer
    },
})