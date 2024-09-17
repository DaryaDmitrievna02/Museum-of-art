import { Artworks } from "@utils/types";

export const getResult = async (
  search: string,
  current_page: number,
  limit: number,
): Promise<Artworks> => {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?limit=${limit}&page=${current_page}&fields=id,title,image_id,artist_title,date_display&q=${search}`,
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
