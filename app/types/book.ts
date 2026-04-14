export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
}
export type FiltersFormData = {
    page?: number,
    limit?: number,
    title?: string
    author?: string
    // pages?: number
}