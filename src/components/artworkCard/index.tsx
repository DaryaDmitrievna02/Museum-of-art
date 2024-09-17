import bookmark from "@assets/bookmark.svg";
import { Paths } from "@constants/paths";
import { useNavigate } from "react-router-dom";

import { Bookmark } from "../bookmark";
import { ImageHandler } from "../imageHandler";
import styles from "./index.module.css";

type Props = {
  innerImg?: boolean;
  id?: number;
  title?: string;
  image?: string;
  artist_title?: string;
};

export const ArtworkCard = ({
  title = "Untitled",
  id = 0,
  image = bookmark,
  innerImg = false,
  artist_title = "",
}: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`${styles.container} ${
          innerImg && styles.containerWithInner
        }`}
      >
        <div
          onClick={() => navigate(`${Paths.artwork}/${id}`)}
          className={styles.about}
        >
          {innerImg && <ImageHandler ImgID={image} />}
          <div>
            <h3 className={styles.h3}>{title}</h3>
            <p className={styles.artist}>{artist_title}</p>
            <span>Public</span>
          </div>
        </div>
        <Bookmark id={id}></Bookmark>
      </div>
    </>
  );
};
