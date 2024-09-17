import { useNavigate } from "react-router-dom";

import { Paths } from "../../constants/paths";
import styles from "./index.module.css";

type Props = {
  error: string | undefined;
};

export const NotFoundMessage = ({ error = "" }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {error == "" ? (
        <p className={styles.message}>
          Something went wrong. Check the URL and try again. If that doesn’t
          help, you can return to the{" "}
          <span className={styles.link} onClick={() => navigate(Paths.home)}>
            homepage
          </span>
        </p>
      ) : (
        <p className={styles.message}>Something went wrong. {error}</p>
      )}
    </div>
  );
};

