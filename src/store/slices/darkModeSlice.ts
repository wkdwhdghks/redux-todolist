import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DarkMode {
  darkMode: boolean;
}

const initialState: DarkMode = {
  darkMode: false,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      }
    },
    darkModeCheck: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      if (state.darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
      }
    },
  },
});

export const { toggleDarkMode, darkModeCheck } = darkModeSlice.actions;
export default darkModeSlice;
