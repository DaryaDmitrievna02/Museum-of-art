import search from "@assets/search.svg";
import sortIcon from "@assets/sort_icon.svg";
import React, { useState } from "react";

import styles from "./index.module.css";

type Props = {
  query: string;
  setQuery: (query: string) => void;
  setIsSort: (updater: (prev: boolean) => boolean) => void;
};

const allowedPattern = /^[a-zA-Z0-9\s\-_,.]+$/;

export const SearchForm = ({ query, setQuery, setIsSort }: Props) => {
  const [error, setError] = useState("");

  const sortHandle = () => setIsSort(prev => !prev);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
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
        <img
          className={styles.icon}
          src={sortIcon}
          alt="sort-icon"
          onClick={sortHandle}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
    </>
  );
};

