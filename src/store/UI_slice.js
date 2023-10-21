import { createSlice } from "@reduxjs/toolkit";

const UI_slice = createSlice({

    name:"UI",
    initialState:{Notification:null},
    reducers:{
        showNotification(state, action){
            state.notification = {
                message:action.payload.message,
                type:action.payload.type,
                open:action.payload.open
            }
        }
    }
})

export const UIActions = UI_slice.actions
export default UI_slice