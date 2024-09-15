import styles from "./index.module.css";

export const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.dot}></div>
      <span className={styles.message}>Loading</span>
    </div>
  );
};
