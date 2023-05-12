import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../store/slices/todoSlice";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import styles from "./TodoItem.module.css";

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
    <div className={styles.container}>
      {todo.isActive ? (
        <form className={styles.form}>
          <div className={styles.formLeftContainer}>
            <input
              className={styles.input}
              value={edit}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formRightContainer}>
            <AiFillCheckCircle className={styles.check} onClick={handleEdit} />
            <AiFillCloseCircle
              className={styles.close}
              onClick={handleCancel}
            />
          </div>
        </form>
      ) : (
        <div className={styles.todoContainer}>
          <div className={styles.leftContainer}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={todo.status}
              onChange={handleUpdate}
            />
            <p
              className={`${styles.todo} ${todo.status ? styles.todoLine : ""}`}
            >
              {todo.text}
            </p>
          </div>
          <div className={styles.rightContainer}>
            <BiEdit className={styles.edit} onClick={handleisActive} />
            <FaTrashAlt className={styles.trash} onClick={handleDelete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
