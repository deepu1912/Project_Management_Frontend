import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createTask = createAsyncThunk("createTask", async (taskData) => {
  console.log("tdata", JSON.stringify(taskData));
  try {
    const response = await fetch(
      "http://localhost:8000/api/project/:projectId/createTask",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(taskData),
      }
    );
    const responseData = await response.json();
    console.log("td", responseData);
    return responseData;
  } catch (error) {
    console.log("Error in login user data", error);
    throw error;
  }
});

const createTaskSlice = createSlice({
  name: "createTask",
  initialState: {
    isLoading: false,
    taskData: null,
    isError: false,
  },
  reducers: {
    logout: (state) => {
      state.taskData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      console.log("action", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
      state.isLoading = false;
      state.taskData = action.payload;
      state.isError = false;
      console.log("action", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
    });
    builder.addCase(createTask.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default createTaskSlice.reducer;
