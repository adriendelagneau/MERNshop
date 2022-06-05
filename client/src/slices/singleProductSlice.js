import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import axios from 'axios'
const initialState = {
    item: [],
    status: null,
}

export const productFetch = createAsyncThunk(
    "products/productDetailsFetch",
    async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/products/find/${id}`)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }
)

export const postReviews = createAsyncThunk("products/postReviews", async ( bb) => {

        const { id} = bb;
       
        try {
           
            const res = await axios.put(`http://localhost:5000/api/products/reviews/${id}`, bb)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }
)

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: {
        [productFetch.pending]: (state, action) => {
            state.status = "pending"
        },
        [productFetch.fulfilled]: (state, action) => {
            state.status = "success"
            state.item = action.payload
        },
        [productFetch.rejected]: (state, action) => {
            state.status = "rejected"
        },

        [postReviews.pending]: (state, action) => {
            state.status = "pending"
        },
        [postReviews.fulfilled]: (state, action) => {
            state.status = "success"
            state.item = action.payload
        },
        [postReviews.rejected]: (state, action) => {
            state.status = "rejected"
        },
    }
})

export default productSlice.reducer