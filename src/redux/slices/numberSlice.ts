import { createSlice } from '@reduxjs/toolkit';
// import { region } from '../../utils/constants';
import { RootState } from '../store'

interface NumberSliceState {
  region: string;
  number: string;
}

const initialState: NumberSliceState = {
  region: '',
  number: ''
}

const numberSlice = createSlice({
  name: 'number',
  initialState,
  reducers: {
    addRegion(state, action) {
      state.region = action.payload
    },
    addNumber(state, action) {
      state.number = action.payload;
    }
  }
})

export const selectNumber = (state: RootState) => state.number

export const { addRegion, addNumber } = numberSlice.actions;

export default numberSlice.reducer;