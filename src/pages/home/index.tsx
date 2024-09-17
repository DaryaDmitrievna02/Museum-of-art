import { useEffect, useState } from "react";

import { ArtworkCard } from "../../components/artworkCard";
import { CardsLayout } from "../../components/cardsLayout";
import { CustomButton } from "../../components/customButton";
import { ImgWithDescription } from "../../components/imgWithDescription";
import { Layout } from "../../components/Layout";
import { Loading } from "../../components/loading";
import { Pagination } from "../../components/pagination";
import { SearchForm } from "../../components/search-form";
import { Topic } from "../../components/topics";
import { useDebounce } from "../../utils/customHooks/useDebounce";
import { getResult } from "../../utils/getResult";
import { Artworks } from "../../utils/types";
import styles from "./index.module.css";

export const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Artworks | undefined>();
  const [staticResults, setStaticResults] = useState<Artworks>();

  const [limit, setLimit] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(true);

  const debounced = useDebounce(query, 500);

  useEffect(() => {
    setLoading(true);
    if (query)
      getResult(query, currentPage, 9)
        .then(result => {
          setResults(result);
          setTotalPages(result.pagination.total_pages);
        })
        .finally(() => {
          setLoading(false);
        });
    else setResults(undefined);
  }, [debounced, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  useEffect(() => {
    getResult("", 3, 9)
      .then(result => {
        setStaticResults(result);
      })
      .catch(() => {
        setStaticResults(undefined);
      });
  }, []);

  return (
    <Layout>
      <h1 className={styles.title}>
        Let's Find Some <span className={styles.highlight}>Art</span>
        <span className={styles.here}>Here!</span>
      </h1>

      <SearchForm query={query} setQuery={setQuery}></SearchForm>

      {loading && query ? (
        <Loading></Loading>
      ) : !results?.data.length ? (
        query && <span>The search for “{query}” returned 0 items.</span>
      ) : (
        <>
          <CardsLayout>
            {results?.data.map((result, index) => {
              if (index < limit)
                return (
                  <ImgWithDescription
                    key={result.id}
                    props={result.image_id || ""}
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

      <h1 className={styles.secondTitle}>
        <span>Topics for you</span>
        <br />
        <span>Our special gallery</span>
      </h1>

      <Topic></Topic>

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
    </Layout>
  );
};
