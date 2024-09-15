import { ReactNode } from "react";

import styles from "./index.module.css";
import { ImageHandler } from "../../utils/imageHandler";

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
