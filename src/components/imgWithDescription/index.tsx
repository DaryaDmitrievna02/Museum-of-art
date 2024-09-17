import { ReactNode } from "react";

import { ImageHandler } from "../imageHandler";
import styles from "./index.module.css";

type Props = {
  children: ReactNode;
  props: string;
};

export const ImgWithDescription = ({ children, props }: Props) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.img}>
          <ImageHandler ImgID={props} />
        </div>

        <div className={styles.desc}>{children}</div>
      </div>
    </>
  );
};

