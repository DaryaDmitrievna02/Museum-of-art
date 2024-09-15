import styles from "./index.module.css";
import bookmark from "../../assets/bookmark.svg";
import { getSessionStorage } from "../../utils/sessionStorage/getSessionStorage";
import { useEffect, useState } from "react";

type Props = {
  id: number;
};

export const Bookmark = ({ id }: Props) => {
  const [bookmarkActive, isBookmarkActive] = useState<boolean>(() => {
    return getSessionStorage().includes(id) ? true : false;
  });

  const handleBookmark = (id: number) => {
    let bookmarks = getSessionStorage();

    if (bookmarks.includes(id)) {
      bookmarks = bookmarks.filter((item: number) => item != id);

      isBookmarkActive(false);
    } else {
      isBookmarkActive(true);

      bookmarks.push(id);
    }

    sessionStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    window.dispatchEvent(new Event("bookmarks-updated"));
  };

  return (
    <button
      data-testid="btnBookmark"
      data-active={bookmarkActive}
      className={`${styles.bookmark} ${
        bookmarkActive && styles.bookmarkActive
      }`}
      onClick={() => handleBookmark(id)}
    >
      <img className={styles.icon} src={bookmark} alt="" />
    </button>
  );
};
