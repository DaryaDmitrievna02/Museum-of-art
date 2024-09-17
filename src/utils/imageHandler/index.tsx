import { useEffect, useState } from "react";

import span from "../../assets/span.svg";
import { Loading } from "../../components/loading";

type Props = {
  ImgID: string;
};

export const ImageHandler = ({ ImgID }: Props) => {
  const [imgSrc, setImgSrc] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setImgSrc(`https://www.artic.edu/iiif/2/${ImgID}/full/843,/0/default.jpg`);
    setLoading(true);
  }, []);

  return (
    <>
      {loading && <Loading />}
      <img
        src={imgSrc}
        onLoad={() => {
          setLoading(false);
        }}
        onError={() => setImgSrc(span)}
        alt="Artwork"
        style={{ display: loading ? "none" : "block" }}
      />
    </>
  );
};
