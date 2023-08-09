// dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching data
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  try {
    const response = await axios.get( "https://coin-catalogue-project.vercel.app/");
    return response.data;
  } catch (error) {
    throw Error("Error fetching data");
  }
});

const dataSlice = createSlice({
  name: "data",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default dataSlice.reducer;
