import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: new Set(),
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUsers: (state, action) => {
            state.users.add(action.payload);
        },
    },
});

export const { addUsers } = usersSlice.actions;

export const getUser = (state, id) => {
    if (state.users.has(id)) {
        return state.users.get(id);
    } else {
        return null;
    }
}

export default usersSlice.reducer;
