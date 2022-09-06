export interface PageParams {
  limit: number | string;
  page: number | string;
}

export interface PagedResponse<T> {
  data: T[],
  isNextAvaible: boolean;
  ok: boolean
}
