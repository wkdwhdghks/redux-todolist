import { useState } from "react";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

const Header: React.FC = () => {
  const [timer, setTimer] = useState("00:00:00");

  const todayTime = () => {
    const now = new Date();
    const todayYear = now.getFullYear();
    const todayMonth = now.getMonth() + 1;
    const todayDate = now.getDate();
    const week = ["SUN", "MON", "TUE", "WED", "THE", "FRI", "SAT"];
    const dayOfWeek = week[now.getDay()];

    return todayYear + "." + todayMonth + "." + todayDate + dayOfWeek;
  };

  const currentTimer = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    setTimer(`${hours}:${minutes}:${seconds}`);
  };

  const startTimer = () => setInterval(currentTimer, 1000);
  startTimer();

  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const a = todos.filter((todo) => !todo.status).length;

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.circleContainer}>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
        </div>

        <div className={styles.circleContainer}>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
        </div>
      </div>

      <div>
        <p className={styles.title}>오늘 할 일</p>
        <p className={styles.subTitle}>할 일 {a}개</p>
        <span className={styles.ymd}>{todayTime().slice(0, 9)}</span>
        <span className={styles.day}>{todayTime().slice(9, 12)}</span>
        <span>{timer}</span>
      </div>
    </div>
  );
};

export default Header;
