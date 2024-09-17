import styles from "./index.module.css";

type Props = {
  totalPages: number;
  visiblePages: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
};

export const Pagination = ({
  totalPages,
  visiblePages,
  currentPage,
  setCurrentPage,
}: Props) => {
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const visiblePageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_v, i) => startPage + i,
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <>
        <div>
          {endPage == 4 ? (
            <></>
          ) : (
            <button
              className={styles.prev}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            ></button>
          )}

          {visiblePageNumbers.map(page => (
            <button
              className={`${styles.pageNumber}  ${
                page === currentPage ? styles.active : ""
              }`}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          {totalPages != endPage && (
            <button
              data-testid={"next-button"}
              className={styles.next}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            ></button>
          )}
        </div>
      </>
    </>
  );
};

