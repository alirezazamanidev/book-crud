export interface UpdateBookCommand {
  id: string;
  title?: string;
  price?: string
  language?: string;

  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}
