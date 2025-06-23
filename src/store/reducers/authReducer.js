import { createSlice } from "@reduxjs/toolkit";
import { decryptData, encryptData } from "../../config/lib";

// import { __admin__, __user__ } from "./../../config/userAfterEncrypt";

const getUserInfoFromLocal = () => {
  if (sessionStorage.getItem("userInfo"))
    return JSON.parse(decryptData(sessionStorage.getItem("userInfo")));
  return { role: "guest", token: null };
  // else return JSON.parse(decryptData(__admin__));
  // else return JSON.parse(decryptData(__user__));  
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getUserInfoFromLocal(),
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.userName;
      state.id = action.payload.id;
      state.role = action.payload.roles[0];

      sessionStorage.setItem(
        "userInfo",
        encryptData(JSON.stringify(state))
      );

    },
    logout: (state) => {
      sessionStorage.removeItem("userInfo");

      state.role = "guest";
      state.token = null;
      state.userName = null;
      state.id = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
