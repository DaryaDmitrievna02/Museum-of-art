import { getArtwork } from "@api/getArtwotk";
import { Bookmark } from "@components/bookmark";
import { ImageHandler } from "@components/imageHandler";
import { Layout } from "@components/Layout";
import { Loading } from "@components/loading";
import { NotFoundMessage } from "@components/notFoundMessage";
import { nationalities } from "@constants/nationalities";
import { Paths } from "@constants/paths";
import { Artwork } from "@utils/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./index.module.css";

function getNationality(artist: string | undefined) {
  if (!artist) return "-";
  const nationality = nationalities.find(nation => artist.includes(nation));
  return nationality || "-";
}

export const ArtworkDetails = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState<Artwork>();
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const result = await getArtwork(id);
        setArtwork(result.data[0]);
      } catch {
        navigate(Paths.notFound);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  return (
    <>
      <Layout>
        {loading ? (
          <Loading />
        ) : !artwork ? (
          <NotFoundMessage error="" />
        ) : (
          <main className={styles.container}>
            <section className={styles.img_container}>
              {artwork.image_id && <ImageHandler ImgID={artwork.image_id} />}
              <div className={styles.bookmark}>
                <Bookmark id={artwork.id} />
              </div>
            </section>

            <article className={`${styles.article} ${styles.bold}`}>
              <div className={styles.title}>
                <h1>{artwork.title}</h1>
                <h2>
                  <span className={styles.artist_title}>
                    {artwork.artist_title}
                  </span>
                </h2>
                <span>{artwork.date_display?.replace("/", "-")}</span>
              </div>

              <section className={styles.overview}>
                <h1>Overview</h1>
                <p>
                  <span className={styles.highlight}>Artist nacionality:</span>{" "}
                  {getNationality(artwork.artist_display)}
                  <br />
                  <span className={styles.highlight}>
                    Dimensions Sheet:
                  </span>{" "}
                  {artwork.dimensions?.split(";")[0]}
                  <br />
                  <span className={styles.highlight}>Credit Line: </span>{" "}
                  {artwork.credit_line}
                  <br />
                  <span className={styles.highlight}>Repository:</span>{" "}
                  {artwork.gallery_title ? artwork.gallery_title : "-"}
                  <br />
                </p>
              </section>
            </article>
          </main>
        )}
      </Layout>
    </>
  );
};
