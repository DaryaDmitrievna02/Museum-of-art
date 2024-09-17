import { ReactNode } from "react";

import styles from "./index.module.css";

type Props = {
  children: ReactNode;
  action?: () => void;
};

export const CustomButton = ({ children, action }: Props) => {
  return (
    <button className={styles.btn} onClick={action}>
      {children}
    </button>
  );
};
