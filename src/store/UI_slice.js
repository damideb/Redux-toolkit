import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sendCartdata = createAsyncThunk('UI_slice/sendCartItems',async(cart)=>{
    const res = await fetch("https://redux-http-1d9aa-default-rtdb.firebaseio.com/cartitems.json",{
        method:"PUT",
        body:JSON.stringify(cart)
      }) 
 
      return  res.json()
})


const UI_slice = createSlice({
    name:"UI",
    initialState:{Notification:null},
    reducers:{
        showNotification(state){
            state.Notification.open = false
        }
    },
      extraReducers:(builder)=>{
            builder.addCase(sendCartdata.pending,( state)=>{
                state.Notification ={
                message:"sending Request...",
                type: 'warning',
                open:true
                }})
                builder.addCase(sendCartdata.fulfilled,(state)=>{
                    state.Notification ={
                    message:"Request sent",
                    type: "success",
                    open:true
                    }})
                    builder.addCase(sendCartdata.rejected,( state)=>{
                        state.Notification ={
                            message:"Request failed",
                            type: "error",
                            open:true
                        }})
        }})

export const UIActions = UI_slice.actions
export default UI_slice
