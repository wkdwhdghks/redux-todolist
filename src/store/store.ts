import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./slices/todoSlice";
import darkModeSlice from "./slices/darkModeSlice";

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    darkMode: darkModeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
