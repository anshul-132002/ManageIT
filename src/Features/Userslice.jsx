import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// !!Async thunk for creating a user
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://670f6b893e7151861657cf3e.mockapi.io/users",
        data
      );
      return response.data; // Return the created user data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//!! Async thunk to show all users
export const ShowUser = createAsyncThunk(
  "getUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://670f6b893e7151861657cf3e.mockapi.io/users"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//!! Async thunk to delete all
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://670f6b893e7151861657cf3e.mockapi.io/users/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//!!Updata user
export const updateData = createAsyncThunk(
  "updataUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://670f6b893e7151861657cf3e.mockapi.io/users/${data.id}`,data 
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// User slice
export const userSlice = createSlice({
  name: "userDetails",
  initialState: {
    user: [],
    loading: false,
    error: null,
    searchData:[]
  },
  reducers: {
    userData:(state,action)=>{
      state.searchData=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      //**Create user */
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //**Show User */
      .addCase(ShowUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ShowUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(ShowUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //??delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        const { id } = action.payload;
        if (id) {
          state.user = state.user.filter((user) => user.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       //??Updata user
       .addCase(updateData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.loading = false;
      state.user= state.user.map((ele)=>
        ele.id === action.payload.id ? action.payload : ele
      )
      })
      .addCase(updateData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default userSlice.reducer;
export const { userData } = userSlice.actions;