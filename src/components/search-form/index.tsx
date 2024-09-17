import React, { useState } from "react";

import search from "../../assets/search.svg";
import styles from "./index.module.css";

type Props = {
  query: string;
  setQuery: (query: string) => void;
};

const allowedPattern = /^[a-zA-Z0-9\s\-_,.]+$/;

export const SearchForm = ({ query, setQuery }: Props) => {
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value);
    if (!allowedPattern.test(value) && value != "") {
      setError(
        "Invalid characters. Only letters, numbers, spaces, dashes, underscores, and commas are allowed.",
      );
      return;
    }

    if (value.length > 50) {
      setError("Search query cannot exceed 50 characters.");
      return;
    }
    setError("");
    setQuery(value);
  };
  return (
    <>
      <div className={styles.container}>
        <input
          type="text"
          value={query}
          onChange={e => handleChange(e)}
          placeholder="Search art, artist, work..."
        />
        <img className={styles.icon} src={search} alt="search-icon" />
      </div>
      {error && <div className="error-message">{error}</div>}
    </>
  );
};

