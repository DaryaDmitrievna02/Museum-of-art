import { Artworks } from "./types";

export const getFavorites = async (IDs: string): Promise<Artworks> => {
  const res = await fetch(`https://api.artic.edu/api/v1/artworks?ids=${IDs}`);
  const data = res.json();
  return data;
};
