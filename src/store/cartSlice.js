import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

 export const getData = createAsyncThunk("cart/getData",  async()=>{
        const res =  await fetch("https://redux-http-1d9aa-default-rtdb.firebaseio.com/cartitems.json")
        const data = await res.json()
        return data;
    })
 

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        itemsList:[],
        totalQuantity:0,
        showCart:false, 
        changed: false
    },
    reducers:{
        addToCart: (state,action)=>{
            state.changed = true
            const newItem = action.payload
            const alreadyInCart = state.itemsList.find((item)=>newItem.id===item.id)
            
                if(alreadyInCart){
                    alreadyInCart.quantity++
                    alreadyInCart.totalPrice+=newItem.price
                }
                else{
                    state.itemsList.push({
                        id:newItem.id,
                        price:newItem.price,
                        quantity:1,
                        totalPrice:newItem.price,
                        name:newItem.name,
                    })
                    state.totalQuantity++
                }
            },
        removeFromCart(state, action) {
            state.changed = true
            const id = action.payload;
            const existingItem = state.itemsList.find((item) => item.id === id);

            if (existingItem.quantity === 1) {
              state.itemsList = state.itemsList.filter((item) => item.id !== id);
              state.totalQuantity--;
            } else {
              existingItem.quantity--;
              existingItem.totalPrice -= existingItem.price;
            }
          },
        showCart:(state)=>  { state.showCart=!state.showCart}
    },
        extraReducers:(builder)=>{
                builder.addCase(getData.fulfilled,(state, action)=>{
                   state.itemsList = action.payload.itemsList
                   state.totalQuantity= action.payload.totalQuantity
                })
    }})

export const cartActions = cartSlice.actions
export default cartSlice