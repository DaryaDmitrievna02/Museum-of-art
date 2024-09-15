import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { getFavorites } from "../../utils/getFavorites";
import { getSessionStorage } from "../../utils/sessionStorage/getSessionStorage";
import { Artworks } from "../../utils/types";
import { ArtworkCard } from "../../components/artworkCard";
import { CardsLayout } from "../../components/cardsLayout";
import { Paths } from "../../constants/paths";
import { Link } from "react-router-dom";
import bookmark from "../../assets/bookmark.svg";

import styles from "./index.module.css";
import { Loading } from "../../components/loading";

export const Favorites = () => {
  const [favorites, setFavorites] = useState<Artworks | undefined>();
  const [storage, setStorage] = useState(getSessionStorage());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setFavorites(prev => {
      if (!prev || !prev.data || storage.length == 0) return undefined;
      return {
        ...prev,
        data: prev.data.filter(fav => storage.includes(fav.id)),
      };
    });
  }, [storage]);

  useEffect(() => {
    const updateFavorites = () => {
      setLoading(true);
      const IDs = getSessionStorage().join(",");
      getFavorites(IDs)
        .then(result => {
          setFavorites(result);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    window.addEventListener("bookmarks-updated", () =>
      setStorage(getSessionStorage()),
    );
    if (storage.length != 0) {
      updateFavorites();
    } else setLoading(false);

    return () => {
      window.removeEventListener("bookmarks-updated", () =>
        setStorage(getSessionStorage()),
      );
    };
  }, []);

  return (
    <>
      <Layout>
        {loading && <Loading></Loading>}

        {!loading && favorites && (
          <>
            <h1 className={styles.titleText}>
              Here Are You
              <div className={styles.favorites}>
                <img src={bookmark} alt="" />
                <span className={`${styles.here} ${styles.highlight}`}>
                  Favorites{" "}
                </span>
              </div>
            </h1>

            <CardsLayout>
              {favorites?.data.map(result => {
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
        )}

        {!storage.length && (
          <div className={styles.title}>
            <h1>It’s empty here now</h1>
            <Link to={Paths.home}>
              <span>Home</span>
            </Link>
          </div>
        )}
      </Layout>
    </>
  );
};
