import { createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  checked: boolean;
}

interface Todos {
  todos: Todo[];
}

const initialState: Todos = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
});

export default todosSlice;
