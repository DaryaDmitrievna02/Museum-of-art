import { useEffect, useState } from "react";
import { Artworks } from "../../utils/types";
import { getResult } from "../../utils/getResult";
import { CardsLayout } from "../cardsLayout";
import { ImgWithDescription } from "../imgWithDescription";
import { ArtworkCard } from "../artworkCard";
import { Pagination } from "../pagination";

export const Topic = () => {
  const [results, setResults] = useState<Artworks>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    getResult("", currentPage, 3).then(result => {
      setResults(result);
    });
  }, [currentPage]);

  return (
    <>
      <CardsLayout>
        {results?.data.map(result => {
          return (
            <ImgWithDescription key={result.id} props={result.image_id || ""}>
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

      <div style={{ alignSelf: "flex-end" }}>
        <Pagination
          totalPages={10}
          visiblePages={4}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        ></Pagination>
      </div>
    </>
  );
};
