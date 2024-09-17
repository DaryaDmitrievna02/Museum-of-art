import { Artworks } from "@utils/types";

export const getFavorites = async <T>(IDs: string): Promise<Artworks | T> => {
  try {
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks?ids=${IDs}`,
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
