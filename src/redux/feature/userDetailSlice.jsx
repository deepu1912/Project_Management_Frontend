import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    spaces : null
}

const userDetailSlice = createSlice({
    name:'UserDetailSlice',
    initialState: initialState,
    reducers: {
        setUser: (state,action)=>{
            state.user=action.payload
        },
        clearUser : (state,action)=>{
            state.user= null
        },
        setSpaces : (state,action)=>{
            state.spaces=action.payload
        },
        clearSpace : (state,action)=>{
            state.spaces=null
        }
    }
})

export const {setUser,clearUser,setSpaces,clearSpace} = userDetailSlice.actions
export default userDetailSlice.reducer