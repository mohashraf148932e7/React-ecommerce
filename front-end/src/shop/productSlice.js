import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewProduct, deleteProduct, getAllProducts, updateProduct } from "../api/productApi";

const initialState = {
    products: [],
    errors: null,
    isLoading: false
}

export const getAllProductsAction = createAsyncThunk("product/getAllProductsAction", async(data, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        let response = await getAllProducts();
        return response.data;

    } catch (error) {
        return rejectWithValue(error);
    }
})

export const addProductAction = createAsyncThunk("product/addProductAction", async(product, {rejectWithValue})=>{
    try {
        let response = await addNewProduct(product);
        return response.data;

    } catch (error) {
        return rejectWithValue(error);
    }
})

export const updateProductAction = createAsyncThunk(
    "product/updateProductAction",
    async ({ id, product }, { rejectWithValue }) => {
      try {
        let response = await updateProduct(id, product);
        return response.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  

export const deleteProductAction = createAsyncThunk("product/deleteProductAction", async(id, {rejectWithValue})=>{
    try {
        let response = await deleteProduct(id);
        return id;

    } catch (error) {
        return rejectWithValue(error);
    }
})


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        getAllProductsAction: (state, action)=> {
            getAllProducts().then((response) => {
                state.products = response.data;
            }).catch((error) => {
                state.errors = error;
            })
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getAllProductsAction.pending, (state, action)=>{
            state.isLoading = true;
        })
        builder.addCase(getAllProductsAction.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.products = action.payload;
        })
        builder.addCase(getAllProductsAction.rejected, (state, action)=>{
            state.isLoading = false;
            state.errors = action.payload;
        })
        builder.addCase(deleteProductAction.fulfilled, (state, action)=>{
            state.products = state.products.filter(product => product.id !== action.payload)
        })
    }

})

export const productReducer = productSlice.reducer;