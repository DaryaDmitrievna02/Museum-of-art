import { useEffect, useState } from "react";

export const useDebounce = (query: string, delay: number) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(debounceHandler);
  });

  return debouncedQuery;
};
