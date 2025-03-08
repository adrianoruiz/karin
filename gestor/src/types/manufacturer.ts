export interface Manufacturer {
  id: number | null;
  name: string;
  youtubeLink: string;
  about: string;
  featuredImage: File | null;
  cover: string;
  order: string;
  categories: number[];
  status?: number;
}