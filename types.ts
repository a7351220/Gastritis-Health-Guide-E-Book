export enum PageType {
  COVER = 'COVER',
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  BACK_COVER = 'BACK_COVER'
}

export interface BookPageData {
  id: number;
  type: PageType;
  title?: string;
  content?: string[];
  imageUrl?: string;
  imageCaption?: string;
}
