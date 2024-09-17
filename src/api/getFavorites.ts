import { Artworks } from "../utils/types";

export const getFavorites = async (IDs: string): Promise<Artworks> => {
  try {
    const res = await fetch(`https://api.artic.edu/api/v1/artworks?ids=${IDs}`);
    const data = res.json();
    return data;
  } catch {
    return {
      data: [],
      pagination: { total: 0, total_pages: 0, current_page: 0 },
    };
  }
};

