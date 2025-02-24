import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getAllUsers, getUserById, addUser, updateUser, deleteUser } from "../api/userApi";

const initialState = {
    user: null,
    loading: false,
    error: null
};

export const registerUser = createAsyncThunk('users/registerUser', async(userData, {rejectWithValue}) => {
    try {
        const checkResponse = await getAllUsers();
        const users = checkResponse.data || [];
  
        const userExists = users.some((user) => user.email === userData.email);
        if (userExists) {
          return rejectWithValue("User with this email already exists!");
        }
  
        const response = await addUser(userData);

  
        if (!response.status || response.status !== 201) {
          throw new Error("Registration failed!");
        }
  
        return userData; 
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

export const loginUser = createAsyncThunk('users/loginUser', async(userData, {rejectWithValue}) => {
    try {
        const response = await getAllUsers();
        const users = response.data || [];
  
        const user = users.find((user) => user.email === userData.email);
        if (!user || user.password !== userData.password) {
          return rejectWithValue("Invalid email or password!");
        }
  
        localStorage.setItem("user", JSON.stringify(user));
        return user;
    }catch (error) {
        return rejectWithValue(error.message);
      }
    }
);


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
      logout: (state) => {
        localStorage.removeItem("user");
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
    },
      loadUser: (state) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            state.user = user;
            state.isAuthenticated = true;
        }
    }

    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
    
});


export const { logout, loadUser } = authSlice.actions;
export default authSlice.reducer;