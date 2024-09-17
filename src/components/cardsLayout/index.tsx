import { ReactNode } from "react";

import styles from "./index.module.css";

type Props = {
  children: ReactNode;
};

export const CardsLayout = ({ children }: Props) => {
  return (
    <article data-testid="cards-layout" className={styles.container}>
      {children}
    </article>
  );
};

