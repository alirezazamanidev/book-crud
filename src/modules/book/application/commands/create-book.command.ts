export interface CreateBookCommand {
  title: string;
  price: number;
  isbn: string;
  language: string;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}
