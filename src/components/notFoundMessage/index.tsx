import { useNavigate } from "react-router-dom";

import { Paths } from "../../constants/paths";
import styles from "./index.module.css";

export const NotFoundMessage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p className={styles.message}>
        The page doesn't exist. Check the URL and{" "}
        <span className={styles.link} onClick={() => window.location.reload()}>
          refresh
        </span>{" "}
        the page. If that doesn’t help, you can return to the{" "}
        <span className={styles.link} onClick={() => navigate(Paths.home)}>
          homepage
        </span>
      </p>
    </div>
  );
};
