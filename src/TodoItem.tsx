import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "./store/slices/todoSlice";
import { useState } from "react";

interface Todo {
  id: string;
  text: string;
  status: boolean;
  isActive: boolean;
}

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const [edit, setEdit] = useState(todo.text);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(e.target.value);
  };

  const handleEdit = () => {
    dispatch(updateTodo({ ...todo, text: edit, isActive: false }));
  };

  const handleCancel = () => {
    dispatch(updateTodo({ ...todo, isActive: false }));
    setEdit(todo.text);
  };

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked ? true : false;
    dispatch(updateTodo({ ...todo, status: status }));
  };

  const handleisActive = () => {
    dispatch(updateTodo({ ...todo, isActive: true }));
  };

  const handleDelete = () => dispatch(deleteTodo(todo.id));

  return (
    <div>
      {todo.isActive ? (
        <form>
          <input value={edit} onChange={handleChange}></input>
          <span onClick={handleEdit}>[O]</span>
          <span onClick={handleCancel}>[x]</span>
        </form>
      ) : (
        <div>
          <input type="checkbox" onChange={handleUpdate} />
          {todo.text}
          <span onClick={handleisActive}>[o]</span>
          <span onClick={handleDelete}>[x]</span>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
