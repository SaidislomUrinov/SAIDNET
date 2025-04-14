import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    name: '',
    username: '',
};

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { _id, name, username } = action.payload;
            state._id = _id || '';
            state.name = name || '';
            state.username = username || '';
        },
        clearUser: () => initialState,
    },
});

export const { updateUser, clearUser } = user.actions;
export default user.reducer;
