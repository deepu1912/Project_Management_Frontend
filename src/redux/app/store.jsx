import { configureStore } from "@reduxjs/toolkit";
import authLoginSlice from "../feature/authLoginSlice";
import authRegisterSlice from "../feature/authRegisterSlice";
import userDetailSlice from "../feature/userDetailSlice";
import createProjectSlice from "../feature/createProjectSlice";
import createTaskSlice from "../feature/createTaskSlice";

export const reduxStore = configureStore({
  reducer: {
    authLogin: authLoginSlice,
    authRegister: authRegisterSlice,
    userDetail : userDetailSlice,
    createProject: createProjectSlice,
    createTask: createTaskSlice,
  },
});

export default reduxStore;