import { Artworks } from "../utils/types";

export const getArtwork = async (ID: string): Promise<Artworks> => {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?ids=${ID}&fields=title,date_display,artist_title,artist_display,dimensions,credit_line,gallery_title,location,image_id,id,exhibition_history `,
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

