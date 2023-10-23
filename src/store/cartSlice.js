import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        itemsList:[],
        totalQuantity:0,
        message: "",
        showCart:false
    },
    reducers:{
        addToCart: (state,action)=>{
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
    }})


export const cartActions = cartSlice.actions
export default cartSlice