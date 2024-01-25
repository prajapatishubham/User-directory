import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import postsReducer from '../features/postsSlice';
import { countriesReducer, currentTimeReducer } from '../features/countryandtimeSlice';
export const store = configureStore({
    reducer : {
        users : usersReducer,
        posts : postsReducer,
        countries: countriesReducer,
        currentTime: currentTimeReducer,
       } 
})