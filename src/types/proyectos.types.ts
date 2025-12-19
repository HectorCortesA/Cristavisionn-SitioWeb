export interface ImageType {
  id: number;
  alt: string;
  src?: string;
}

export interface SectionType {
  id: string;
  label: string;
  title: string;
  description: string;
  images: ImageType[];
}

export interface ShowAllState {
  [key: string]: boolean;
}
