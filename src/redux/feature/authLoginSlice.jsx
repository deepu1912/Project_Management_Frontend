import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postLoginData = createAsyncThunk(
  "postLoginData",
  async (userData) => {
    console.log("udata", JSON.stringify(userData));
    try {
      // https://d158-2406-7400-10a-177b-b9db-1035-919c-c942.ngrok-free.app
      const response = await fetch("http://localhost:8000/api/user/login", {
        // const response = await fetch(
        //   " https://d158-2406-7400-10a-177b-b9db-1035-919c-c942.ngrok-free.app/api/user/login",
        //   {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const responseData = await response.json();
      console.log("rd", responseData);
      return responseData;
    } catch (error) {
      console.log("Error in login user data", error);
      throw error;
    }
  }
);

const authLoginSlice = createSlice({
  name: "authLogin",
  initialState: {
    isLoading: false,
    userData: null,
    isError: false,
  },
  reducers: {
    logout: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLoginData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postLoginData.fulfilled, (state, action) => {
      console.log("action", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
      state.isLoading = false;
      state.userData = action.payload;
      state.isError = false;
      console.log("action", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
    });
    builder.addCase(postLoginData.rejected, (state) => {
      state.isError = true;
    });
  },
});
export const { logout } = authLoginSlice.actions;
export default authLoginSlice.reducer;
