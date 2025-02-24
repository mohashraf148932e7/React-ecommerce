import {configureStore} from '@reduxjs/toolkit';
import { productReducer } from './productSlice';
import { cartReducer } from './cartSlice';
import authReducer from './userSlice';

export const myStore = configureStore({
    reducer: {
        productSlice :productReducer,
        cartReducer: cartReducer,
        auth: authReducer
    },
});