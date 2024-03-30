import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: StateType = {
  loading: false,
  words: [],
  result: [],
};

const rootReducer = createSlice({
  name: "root",
  initialState,
  reducers: {
    getWordsRequest: (state) => {
      state.loading = true;
    },

    getWordsSuccess: (state, action: PayloadAction<WordType[]>) => {
      (state.loading = false), (state.words = action.payload);
    },

    getWordsFailure: (state, action: PayloadAction<string>) => {
      (state.loading = false), (state.error = action.payload);
    },

    getResultsSuccess: (state, action: PayloadAction<string[]>) => {
      (state.loading = true), (state.result = action.payload);
    },

    getClearState: (state) => {
      state.loading = false;
      (state.words = []), (state.result = []), (state.error = undefined);
    },
  },
});

export const {
  getWordsRequest,
  getWordsSuccess,
  getWordsFailure,
  getResultsSuccess,
  getClearState,
} = rootReducer.actions;

export default rootReducer.reducer;
