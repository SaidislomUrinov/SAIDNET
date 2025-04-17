import { configureStore } from "@reduxjs/toolkit";
import state from './state';
export default configureStore({
    reducer: {
        state
    }
});