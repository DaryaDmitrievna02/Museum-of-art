import { Artworks } from "../utils/types";

export const getArtwork = async (ID: string): Promise<Artworks> => {
  try {
    const res = await fetch(
      `https://api.artic.edu/api/v1/artworks?ids=${ID}&fields=title,date_display,artist_title,artist_display,dimensions,credit_line,gallery_title,location,image_id,id,exhibition_history `,
    );
    const data = res.json();
    return data;
  } catch {
    return {
      data: [],
      pagination: { total: 0, total_pages: 0, current_page: 0 },
    };
  }
};

