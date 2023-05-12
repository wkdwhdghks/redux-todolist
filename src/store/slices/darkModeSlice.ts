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
      updateDarkMode(state.darkMode);
    },
    darkModeCheck: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      updateDarkMode(state.darkMode);
    },
  },
});

function updateDarkMode(darkMode: boolean) {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}

export const { toggleDarkMode, darkModeCheck } = darkModeSlice.actions;
export default darkModeSlice;
