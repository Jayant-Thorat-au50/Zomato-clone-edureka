
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../../src/Helpers/axiosInstance'
import {toast} from 'react-hot-toast'

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || " ",
    data: JSON.parse(localStorage.getItem("data")) || {},
    SAdminReqList: []
}

// register a user in the user collection
export const register = createAsyncThunk("auth/signUp", async (singnUpData) => {
    try {
      const res = axiosInstance.post("/user/register", singnUpData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast.promise(res, {
        loading: "wait! creating your account",
        success: (data) => {
          return data?.data?.message;
        },
        error: "failed to create your acc",
      });
  
      return (await res).data;
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  });

// making the user login and get access to the personal acc and portfolio
export const loginNow = createAsyncThunk("auth/login", async (loginData) => {
  try {
    const res = axiosInstance.post("/user/login", loginData);
    toast.promise(res, {
      loading: "wait! loggin you in",
      success: (response) => {
        return response?.data?.message;
      },
      error: "failed to log in",
    });
    return (await res).data;
  } catch (error) {
    return toast.error(error?.response?.data?.message);
  }
});

// logging out the user
export const logout = createAsyncThunk("auth/logout", async (userId) => {
  try {
    const res = axiosInstance.get(`/user/logout/${userId}`);
    toast.promise(res, {
      loading: "wait! logging out",
      success: (data) => {
        return data?.data?.message;
      },
      error: "failed to log out",
    });

    return (await res).data;
  } catch (error) {
    return toast.error(error?.response?.data?.message);
  }
});

export const userUpdate = createAsyncThunk(
  "user/profile/update",
  async (data) => {
    try {
      const res = axiosInstance.put(`/user/user-update/${data[0]}`, data[1], {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.promise(res, {
        loading: "wait! user update is in progress",
        success: (data) => {
          return data?.data?.message;
        },
        error: "failed to update profile",
      });

      return (await res).data;
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "user/forgetPassword",
  async (data) => {
    console.log(data);

    try {
      const res = await axiosInstance.post("/user/forgotPassword/", data);
      return res.data;
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  }
);

// getting the updated or not updated user data in the state
export const getUserData = createAsyncThunk("user/me", async (userId) => {
  try {
    const res = await axiosInstance.get(`/user/me/${userId}`);
    return res.data;
  } catch (error) {
    return toast.error(error?.response?.data?.message);
  }
});

export const changePassword = createAsyncThunk(
  "user/changetPassword",
  async (data) => {
    try {
      const response = await axiosInstance.post(
        `/user/change-password/${data[0]}`,
        data[1]
      );

      console.log(response.data);

      return response.data;
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/remove-user",
  async (userId) => {
    try {
      const response = axiosInstance.delete(`/user/remove-user/${userId}`);

      toast.promise(response, {
        loading: "deleting the user",
        success: (res) => {
          return res?.data?.message;
        },
        error: "failed to delete the user",
      });

      return (await response).data;
    } catch (error) {
      return toast.error(error?.response?.data?.message);
    }
  }
);


const authSlice = createSlice({
    name:'auth',
    reducers:{},
    extraReducers:{

    }
})

export default authSlice.reducer