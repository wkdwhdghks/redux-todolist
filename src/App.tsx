import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { addTodo } from "./store/slices/todoSlice";
import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import styles from "./App.module.css";
import { darkModeCheck } from "./store/slices/darkModeSlice";

interface Todo {
  id: string;
  text: string;
  status: boolean;
  isActive: boolean;
}

function App() {
  const [text, setText] = useState("");
  // const loaclTodos = localStorage.getItem(JSON.parse("todos"));
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

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    dispatch(darkModeCheck(isDark));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <Header />

        <form className={styles.formContainer} onSubmit={onSubmit}>
          <input
            className={styles.input}
            value={text}
            placeholder="할 일을 입력해주세요"
            onChange={handleChange}
          />
          <button className={styles.button} type="submit">
            확인
          </button>
        </form>

        <div className={styles.todoContainer}>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <TodoItem todo={todo} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
