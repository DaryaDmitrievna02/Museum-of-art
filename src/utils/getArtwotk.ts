import { Artworks } from "./types";

export const getArtwork = async (ID: string): Promise<Artworks> => {
  const res = await fetch(
    `https://api.artic.edu/api/v1/artworks?ids=${ID}&fields=title,date_display,artist_title,artist_display,dimensions,credit_line,gallery_title,location,image_id,id,exhibition_history `,
  );
  const data = res.json();
  return data;
};
