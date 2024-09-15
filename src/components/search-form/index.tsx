import search from "../../assets/search.svg";
import styles from "./index.module.css";

type Props = {
  query: string;
  setQuery: (query: string) => void;
};

export const SearchForm = ({ query, setQuery }: Props) => {
  return (
    <>
      <div className={styles.container}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search art, artist, work..."
        />
        <img className={styles.icon} src={search} alt="search-icon" />
      </div>
    </>
  );
};
