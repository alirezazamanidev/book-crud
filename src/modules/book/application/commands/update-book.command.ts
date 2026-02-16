export interface UpdateBookCommand {
  id: string;
  title?: string;
  price?: number
  language?: string;

  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}
