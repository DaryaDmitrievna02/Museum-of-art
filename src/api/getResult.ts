import { Artworks } from "../utils/types";

export const getResult = async (
  search: string,
  current_page: number,
  limit: number,
): Promise<Artworks> => {
  try {
    const res = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?limit=${limit}&page=${current_page}&fields=id,title,image_id,artist_title&q=${search}`,
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

