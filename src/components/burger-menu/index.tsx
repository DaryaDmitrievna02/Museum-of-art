import bookmark from "@assets/bookmark.svg";
import home from "@assets/home.svg";
import { Paths } from "@constants/paths";
import { useBurger } from "@utils/customHooks/useBurger";
import { Link } from "react-router-dom";

import styles from "./index.module.css";

export const BurgerMenu = () => {
  const { isOpen, toggleMenu, menuRef, toggleRef } = useBurger();

  return (
    <div className={styles.burger}>
      <button
        ref={toggleRef}
        onClick={toggleMenu}
        className={styles.burgerButton}
      >
        ☰
      </button>
      {isOpen && (
        <div className={styles.menu} ref={menuRef}>
          <ul>
            <Link to={Paths.home}>
              <div className={styles.link}>
                <img src={home} alt="home" />
                <span>Home</span>
              </div>
            </Link>
            <br></br>
            <Link to={Paths.favorites}>
              {" "}
              <div className={styles.link}>
                <img src={bookmark} alt="bookmark" />
                <span>Favorites</span>
              </div>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};
