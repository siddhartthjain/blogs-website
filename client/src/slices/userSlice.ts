import { createSlice } from "@reduxjs/toolkit"


const initialState= {
    userId: ""
}

const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserId: (state, action)=>
        {
            state.userId= action.payload;
        },
        clearUserId: (state)=>
        {
           state.userId="";
        }
    }
})

export const {setUserId,clearUserId}= userSlice.actions
export default userSlice.reducer;