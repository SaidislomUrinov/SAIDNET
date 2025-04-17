import { createSlice } from "@reduxjs/toolkit";

const state = createSlice({
    name: 'state',
    initialState: {
        projects: [],
        catalogs: [],
        load: false
    },
    reducers: {
        updateState: (state, { payload }) => {
            state.projects = payload.projects || [];
            state.catalogs = payload.catalogs || [];
            state.load = true
        }
    }
});
export const { updateState } = state.actions;
export default state.reducer;