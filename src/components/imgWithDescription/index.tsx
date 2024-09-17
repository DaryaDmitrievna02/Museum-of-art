import { Paths } from "@constants/paths";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { ImageHandler } from "../imageHandler";
import styles from "./index.module.css";

type Props = {
  children: ReactNode;
  props: string;
  id: number;
};

export const ImgWithDescription = ({ children, props, id }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.img}
          onClick={() => navigate(`${Paths.artwork}/${id}`)}
        >
          <ImageHandler ImgID={props} />
        </div>

        <div className={styles.desc}>{children}</div>
      </div>
    </>
  );
};
