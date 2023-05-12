import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function readTodosFromLocalStroage() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}
interface Todo {
  id: string;
  text: string;
  status: boolean;
  isActive: boolean;
}

interface Todos {
  todos: Todo[];
}

const initialState: Todos = {
  todos: readTodosFromLocalStroage(),
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      localStorage.setItem("todos", JSON.stringify(action.payload));
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const deleteTodo = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      state.todos = deleteTodo;
      localStorage.setItem("todos", JSON.stringify(deleteTodo));
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const updateTodo = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
      state.todos = updateTodo;
      localStorage.setItem("todos", JSON.stringify(updateTodo));
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todosSlice.actions;
export default todosSlice;
