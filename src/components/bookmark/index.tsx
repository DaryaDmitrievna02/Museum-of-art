import bookmark from "@assets/bookmark.svg";
import { bookmarkStorageService } from "@utils/sessionStorage/getSessionStorage";
import { useState } from "react";

import styles from "./index.module.css";

type Props = {
  id: number;
};

export const Bookmark = ({ id }: Props) => {
  const [bookmarkActive, isBookmarkActive] = useState<boolean>(() => {
    return bookmarkStorageService.getBookmarks().includes(id) ? true : false;
  });

  const handleBookmark = (id: number) => {
    if (bookmarkStorageService.getBookmarks().includes(id)) {
      bookmarkStorageService.removeBookmark(id);
      isBookmarkActive(false);
    } else {
      isBookmarkActive(true);
      bookmarkStorageService.addBookmark(id);
    }
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
