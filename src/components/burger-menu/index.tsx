import { Link } from "react-router-dom";

import bookmark from "../../assets/bookmark.svg";
import home from "../../assets/home.svg";
import { Paths } from "../../constants/paths";
import { useBurger } from "../../utils/customHooks/useBurger";
import styles from "./index.module.css";

export const BurgerMenu = () => {
  const { isOpen, toggleMenu } = useBurger();

  return (
    <div className={styles.burger}>
      <button onClick={toggleMenu} className={styles.burgerButton}>
        ☰
      </button>
      {isOpen && (
        <div className={styles.menu}>
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
