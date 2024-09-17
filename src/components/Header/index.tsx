import bookmark from "@assets/bookmark.svg";
import logo from "@assets/museumLogo.svg";
import { Paths } from "@constants/paths";
import { useNavigate } from "react-router-dom";

import { BurgerMenu } from "../burger-menu";
import styles from "./index.module.css";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <img
          onClick={() => navigate(Paths.home)}
          src={logo}
          alt="Museum of Art"
        />
        <div
          className={styles.favorites}
          data-testid="favorites"
          onClick={() => navigate(Paths.favorites)}
        >
          <img src={bookmark} alt="Bookmark" />
          <span>Your favorites</span>
        </div>

        <BurgerMenu data-testid="burger"></BurgerMenu>
      </div>
    </div>
  );
};
