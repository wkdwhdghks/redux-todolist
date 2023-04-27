import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./slices/todoSlice";

export default configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});
