import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import apiCalls from './apiCalls'
const initialState = {
    items: [],
    status: null,
}

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async (cat) => {
        try {
            const res = await apiCalls.fetchProducts(cat)
        
            return res
        } catch (err) {
            console.log(err)
        }
    }
    
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending]: (state, action) => {
            state.status = "pending"
        },
        [productsFetch.fulfilled]: (state, action) => {
            state.status = "success"
            
            state.items = action.payload
        },
        [productsFetch.rejected]: (state, action) => {
            state.status = "rejected"
        },
    }
})

export default productsSlice.reducer