import { APIProfileBookshelf } from '@/types/bookshelf';
import { APIUser } from '@/types/user';
import { publicApi } from '../core/axios';

const bookshelfAPI = {
  getUserSummaryBookshelf: ({ id }: { id: APIUser['userId'] }) =>
    publicApi.get<APIProfileBookshelf>(`/api/users/${id}/bookshelves`),

  getMySummaryBookshelf: () =>
    publicApi.get<APIProfileBookshelf>('/api/bookshelves/me'),
};

export default bookshelfAPI;
