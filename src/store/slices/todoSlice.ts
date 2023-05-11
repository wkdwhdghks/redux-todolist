import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  status: boolean;
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
  reducers: {
    addTodo: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
    // reviseTodo:
  },
});

export const { addTodo, deleteTodo, updateTodo } = todosSlice.actions;
export default todosSlice;
