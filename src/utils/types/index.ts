export type Artworks = {
  data: Artwork[];
  pagination: Pagination;
};

export type Artwork = {
  id: number;
  title: string;
  image_id: string;
  artist_title?: string;
  artist_display?: string;
  date_display?: string;
  dimensions?: string;
  credit_line?: string;
  gallery_title?: string;
  location?: string;
};

type Pagination = {
  total: number;
  total_pages: number;
  current_page: number;
};
