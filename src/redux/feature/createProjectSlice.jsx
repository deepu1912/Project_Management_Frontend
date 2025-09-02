import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createProject = createAsyncThunk(
  "createProject",
  async (projectData) => {
    console.log("pdata", JSON.stringify(projectData));
    try {
      // https://d158-2406-7400-10a-177b-b9db-1035-919c-c942.ngrok-free.app
      const response = await fetch(
        "http://localhost:8000/api/project/createProject/:spaceId",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(projectData),
        }
      );
      const responseData = await response.json();
      console.log("rd", responseData);
      return responseData;
    } catch (error) {
      console.log("Error in login user data", error);
      throw error;
    }
  }
);

const createProjectSlice = createSlice({
  name: "createProject",
  initialState: {
    isLoading: false,
    projectData: null,
    isError: false,
  },
  reducers: {
    logout: (state) => {
      state.projectData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      console.log("action", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
      state.isLoading = false;
      state.projectData = action.payload;
      state.isError = false;
      console.log("action", action); //{type: 'postLoginData/fulfilled', payload: {…}, meta: {…}}
    });
    builder.addCase(createProject.rejected, (state) => {
      state.isError = true;
    });
  },
});

export default createProjectSlice.reducer;
