import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name:"cart",
    initialState:{
        itemsList:[],
        totalQuantity:0,
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
        removeFromCart:()=>{},
        showCart:(state)=>state.showCart=true
    }
})

export const cartActions = cartSlice.actions
export default cartSlice