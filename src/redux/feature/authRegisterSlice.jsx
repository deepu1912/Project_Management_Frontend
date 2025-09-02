import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postRegisterData = createAsyncThunk(
  "postRegisterData",
  async (userData) => {
    console.log("udata", JSON.stringify(userData));
    try {
      // https://d158-2406-7400-10a-177b-b9db-1035-919c-c942.ngrok-free.app
      const response = await fetch("http://localhost:8000/api/user/register", {
        // const response = await fetch(
        //   "https://d158-2406-7400-10a-177b-b9db-1035-919c-c942.ngrok-free.app/api/user/register",
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
      console.log("Error in posting user data", error);
      throw error;
    }
  }
);

const authRegisterSlice = createSlice({
  name: "authRegister",
  initialState: {
    isLoading: false,
    userData: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(postRegisterData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postRegisterData.fulfilled, (state, action) => {
      //   console.log("action", action);
      state.isLoading = false;
      state.userData = action.payload;
      state.isError = false;
      //   console.log("action", action);
      //   console.log("userData", state.userData);
    });
    builder.addCase(postRegisterData.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default authRegisterSlice.reducer;

// When you dispatch a createAsyncThunk action, Redux Toolkit automatically creates three action types for the lifecycle of an asynchronous operation:

// pending: When the asynchronous operation starts.
// fulfilled: When the operation completes successfully.
// rejected: When the operation fails.
// Each of these actions has a different payload:

// For the fulfilled action, the payload will contain the data returned from the API or asynchronous operation.
// For the rejected action, the payload will contain the error data, such as the error message or any specific error details you provide when rejecting the thunk.
// When you dispatch the action, Redux Toolkit handles the promise resolution and provides the action object with the payload. The payload in the action corresponds to the result of the asynchronous operation.
// response: This is the result of the dispatched createAsyncThunk action.
// .payload: This is where the result of the asynchronous operation (the data returned by the API or server) is stored.
