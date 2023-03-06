import {
  APIProfileBookshelf,
  APIBookshelfBookList,
  APIDefaultBookshelf,
  APIBookshelfInfo,
} from '@/types/bookshelf';
import { APIUser } from '@/types/user';
import { publicApi } from '../core/axios';

const bookshelfAPI = {
  getUserSummaryBookshelf: ({ id }: { id: APIUser['userId'] }) =>
    publicApi.get<APIProfileBookshelf>(`/api/users/${id}/bookshelves`),

  getMySummaryBookshelf: () =>
    publicApi.get<APIProfileBookshelf>('/api/bookshelves/me'),

  getBookshelfInfo: ({ userId }: { userId: APIUser['userId'] }) =>
    publicApi.get<APIBookshelfInfo>(`/api/bookshelves?userId=${userId}`),

  // 초기에 16개의 책 리스트 가져옴
  getBookshelfBookList: ({
    bookshelfId,
  }: {
    bookshelfId: APIDefaultBookshelf['bookshelfId'];
  }) =>
    publicApi.get<APIBookshelfBookList>(
      `/api/bookshelves/${bookshelfId}/books?type=READ&pageSize=16&bookCursorId=3&sortDirection=DESC`
    ),
};

export default bookshelfAPI;
