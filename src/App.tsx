import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { addTodo, deleteTodo, updateTodo } from "./store/slices/todoSlice";

interface Todo {
  id: string;
  text: string;
  status: boolean;
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
    const todo: Todo = { id: uuid(), text: text, status: false };
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
            <input
              type="checkbox"
              onChange={(e) => {
                const status = e.target.checked ? true : false;
                dispatch(updateTodo({ ...todo, status: status }));
              }}
            />
            {todo.text} <span>[o]</span>
            <span onClick={() => dispatch(deleteTodo(todo.id))}>[x]</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
