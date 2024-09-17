import { getResult } from "@api/getResult";
import { ArtworkCard } from "@components/artworkCard";
import { CardsLayout } from "@components/cardsLayout";
import { CustomButton } from "@components/customButton";
import { ImgWithDescription } from "@components/imgWithDescription";
import { Layout } from "@components/Layout";
import { Loading } from "@components/loading";
import { NotFoundMessage } from "@components/notFoundMessage";
import { Pagination } from "@components/pagination";
import { SearchForm } from "@components/search-form";
import { Topic } from "@components/topics";
import { useDebounce } from "@utils/customHooks/useDebounce";
import { Artworks } from "@utils/types";
import { useEffect, useState } from "react";

import styles from "./index.module.css";

export const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Artworks>();
  const [staticResults, setStaticResults] = useState<Artworks>();

  const [error, setError] = useState<string>();

  const [limit, setLimit] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [isSort, setIsSort] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const debounced = useDebounce(query, 500);

  const parseDate = (dateString: string): Date => {
    // eslint-disable-next-line no-useless-escape
    const parts = dateString.split(/[\s\/\-–]/);
    const year = parts[0];
    const month = parts[1] || "01";
    const day = parts[2] || "01";
    return new Date(`${year}-${month}-${day}`);
  };

  const sortArtworks = (artworks: Artworks): Artworks => {
    const sortedData = [...artworks.data].sort((a, b) => {
      const dateA = parseDate(a.date_display || "");
      const dateB = parseDate(b.date_display || "");

      return dateB.getTime() - dateA.getTime();
    });

    return {
      ...artworks,
      data: sortedData,
    };
  };

  const fetchResults = async (query: string, currentPage: number) => {
    try {
      setLoading(true);

      const result = await getResult(query, currentPage, 9);
      setResults(result);
      setTotalPages(result.pagination.total_pages);

      if (isSort && query) {
        setResults(sortArtworks(result));
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setResults(undefined);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaticResults = async () => {
    try {
      const result = await getResult("", 3, 9);
      setStaticResults(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setStaticResults(undefined);
    }
  };
  useEffect(() => {
    if (query) {
      fetchResults(query, currentPage);
    } else {
      setResults(undefined);
    }
  }, [debounced, currentPage, isSort]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    fetchStaticResults();
  }, []);

  return (
    <Layout>
      {error && <NotFoundMessage error={error}></NotFoundMessage>}
      {!error && (
        <>
          <h1 className={styles.title}>
            Let's Find Some <span className={styles.highlight}>Art</span>
            <span className={styles.here}>Here!</span>
          </h1>

          <SearchForm
            setIsSort={setIsSort}
            query={query}
            setQuery={setQuery}
          ></SearchForm>

          {loading && query ? (
            <Loading></Loading>
          ) : !results?.data.length ? (
            query && (
              <span style={{ wordBreak: "break-word", textAlign: "center" }}>
                The search for “{query}” returned 0 items.
              </span>
            )
          ) : (
            <>
              <CardsLayout>
                {results?.data.map((result, index) => {
                  if (index < limit)
                    return (
                      <ImgWithDescription
                        key={result.id}
                        props={result.image_id || ""}
                        id={result.id}
                      >
                        <ArtworkCard
                          key={result.id}
                          id={result.id}
                          title={result.title}
                          image={result.image_id}
                          innerImg={false}
                          artist_title={result.artist_title}
                        />
                      </ImgWithDescription>
                    );
                })}
              </CardsLayout>
              <div className={styles.pagination}>
                <CustomButton
                  action={limit == 9 ? () => setLimit(3) : () => setLimit(9)}
                >
                  {limit == 3 ? "View More" : "View Less"}
                </CustomButton>

                <Pagination
                  totalPages={totalPages}
                  visiblePages={4}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                ></Pagination>
              </div>
            </>
          )}

          <>
            <h1 className={styles.secondTitle}>
              <span>Topics for you</span>
              <br />
              <span>Our special gallery</span>
            </h1>
            <Topic></Topic>
          </>

          <>
            <h1 className={styles.secondTitle}>
              <span>Here some more</span>
              <br />
              <span>Other works for you</span>
            </h1>

            <CardsLayout>
              {staticResults?.data.map(result => {
                return (
                  <ArtworkCard
                    key={result.id}
                    id={result.id}
                    title={result.title}
                    image={result.image_id}
                    innerImg={true}
                    artist_title={result.artist_title}
                  />
                );
              })}
            </CardsLayout>
          </>
        </>
      )}
    </Layout>
  );
};
