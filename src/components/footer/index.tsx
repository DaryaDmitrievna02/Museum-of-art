import modsen from "@assets/modsenLogo.svg";
import logo from "@assets/museumLogo2.svg";
import { Paths } from "@constants/paths";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.css";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <img
          onClick={() => navigate(Paths.home)}
          src={logo}
          alt="Museum of Art"
        />
        <div className={styles.favorites}>
          <img src={modsen} alt="Modsen" />
        </div>
      </div>
    </footer>
  );
};
