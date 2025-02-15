
import {configureStore} from '@reduxjs/toolkit'
import authReducer from './Slices/authslice'

const store = configureStore({
    reducer:{
        authstate:authReducer
    }
});

export default store;