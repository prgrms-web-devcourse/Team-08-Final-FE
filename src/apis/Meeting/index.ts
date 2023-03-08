import {
  APICreateMeetingReqeust,
  APIEntireMeetingList,
  APIMeetingGroup,
} from '@/types/meeting';
import { APIMeetingDetailCommentsList } from '@/types/meetingDetailCommentsList';
import { APIMeetingDetail } from '@/types/meetingDetail';
import { publicApi } from '../core/axios';

const MeetingAPI = {
  getEntireMeetingList: () =>
    publicApi.get<APIEntireMeetingList>(`/api/book-groups`, {
      params: {
        pageSize: 10,
        groupCursorId: 999,
        sortDirection: 'DESC',
      },
    }),

  createMeeting: ({ meeting }: { meeting: APICreateMeetingReqeust }) =>
    publicApi.post('/api/book-groups', meeting),

  getMeetingDetailInfo: ({
    bookGroupId,
  }: {
    bookGroupId: APIMeetingGroup['bookGroupId'];
  }) => publicApi.get<APIMeetingDetail>(`/api/book-groups/${bookGroupId}`),

  getMeetingDetailCommentsList: ({
    bookGroupId,
  }: {
    bookGroupId: APIMeetingGroup['bookGroupId'];
  }) =>
    publicApi.get<APIMeetingDetailCommentsList>(
      `/api/book-groups/${bookGroupId}/comments`,
      {
        params: {
          groupCommentCursorId: 100,
          pageSize: 10,
          sortDirection: 'DESC',
        },
      }
    ),
  postMeetingJoin: ({
    bookGroupId,
  }: {
    bookGroupId: APIMeetingGroup['bookGroupId'];
  }) =>
    publicApi.post(`/api/book-groups/${bookGroupId}/join`, {
      joinPassword: null,
    }),
  createMeetingComment: ({
    bookGroupId,
    comment,
  }: {
    bookGroupId: APIMeetingGroup['bookGroupId'];
    comment: string;
  }) =>
    publicApi.post(`/api/book-groups/${bookGroupId}/comment`, {
      comment,
    }),
  deleteMeeting: ({
    bookGroupId,
  }: {
    bookGroupId: APIMeetingGroup['bookGroupId'];
  }) => publicApi.delete(`/api/book-groups/${bookGroupId}`),
};

export default MeetingAPI;
