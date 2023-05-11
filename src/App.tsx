import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { addTodo } from "./store/slices/todoSlice";
import TodoItem from "./TodoItem";

interface Todo {
  id: string;
  text: string;
  status: boolean;
  isActive: boolean;
}

function App() {
  const [text, setText] = useState("");
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo: Todo = {
      id: uuid(),
      text: text,
      status: false,
      isActive: false,
    };
    dispatch(addTodo([...todos, todo]));
    setText("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={text} onChange={handleChange} />
        <button type="submit">확인</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
