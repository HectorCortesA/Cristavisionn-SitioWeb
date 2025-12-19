// types/proyectos.types.ts
export interface ImageType {
  id: number;
  alt: string;
  src: string; // Cambiado de opcional a obligatorio
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

export interface ViewerState {
  isOpen: boolean;
  currentSection: string | null;
  currentImageId: number | null;
}
