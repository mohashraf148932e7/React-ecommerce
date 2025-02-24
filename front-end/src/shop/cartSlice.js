import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState={
    cart:[],
}

export const addToCartAction = createAsyncThunk("cart/addToCartAction", async(product, {rejectWithValue}) => {
    try {
        return product;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const removeFromCartAction = createAsyncThunk("cart/removeFromCartAction", async(product, {rejectWithValue}) => {
    try {
        return product;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const increaseQuantityAction = createAsyncThunk(
  "cart/increaseQuantityAction",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/products/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product stock");
      }

      const product = await response.json();

      if (quantity >= product.quantity) {
        return rejectWithValue("Not enough stock available");
      }

      return { id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const decreaseQuantityAction = createAsyncThunk("cart/decreaseQuantityAction", async ({ id }, { rejectWithValue }) => {
  try {
    return { id };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
   
export const placeOrderAction = createAsyncThunk("cart/placeOrderAction", async (cart, { rejectWithValue }) => {
  try {
    for (const product of cart) {
      const response = await fetch(`http://localhost:3001/products/${product.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      
      const dbProduct = await response.json(); 
      
      const updatedQuantity = dbProduct.quantity - product.quantity;

      if (updatedQuantity < 0) {
        return rejectWithValue(`Not enough stock for product: ${product.name}`);
      }

      const updateResponse = await fetch(`http://localhost:3001/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: updatedQuantity }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update product quantity");
      }
    }
    
    return cart.map((product) => ({ id: product.id }));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.cart.find((p) => p.id === action.payload.id);
            if (existingProduct) {
              existingProduct.quantity += 1;  
            } else {
              state.cart.push({ ...action.payload, quantity: 1 });  
            }
          },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((product) => product.id !== action.payload.id);
        },
        decreaseQuantity: (state, action) => {
            const product = state.cart.find((p) => p.id === action.payload.id);
            if (product && product.quantity > 1) {
            product.quantity -= 1;
            } else {
            state.cart = state.cart.filter((product) => product.id !== action.payload.id);
            }
        }
        },
        extraReducers: (builder) => {
            builder.addCase(addToCartAction.fulfilled, (state, action) => {
                const existingProduct = state.cart.find((p) => p.id === action.payload.id);
                if (existingProduct) {
                  existingProduct.quantity += 1;
                } else {
                  state.cart.push({ ...action.payload, quantity: 1 });
                }
              });
            builder.addCase(removeFromCartAction.fulfilled, (state, action) => {
                state.cart = state.cart.filter((product) => product.id !== action.payload.id);
            });
            
            builder.addCase(increaseQuantityAction.fulfilled, (state, action) => {
              const product = state.cart.find((p) => p.id === action.payload.id);
              if (product) {
                product.quantity += 1;
              }
            });
        
            builder.addCase(decreaseQuantityAction.fulfilled, (state, action) => {
              const product = state.cart.find((p) => p.id === action.payload.id);
              if (product && product.quantity > 0) {
                product.quantity -= 1;
              }
            });
        
            builder.addCase(placeOrderAction.fulfilled, (state, action) => {
              state.cart = [];
            });

    },
})

export const { addToCart, removeFromCart, decreaseQuantity, increaseQuantity } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;