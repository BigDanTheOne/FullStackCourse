import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filteredPlaces: [],
};

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setPlacesIDs: (state, action) => {
            state.filteredPlaces = action.payload;
        },
    },
});

export const { setPlacesIDs } = mapSlice.actions;

export const getBounds = (state) => state.map.filteredPlaces;

export default mapSlice.reducer;
