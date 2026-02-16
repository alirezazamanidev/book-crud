export interface CreateBookCommand {
  title: string;
  price: number | string;
  isbn: string;
  language: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}
