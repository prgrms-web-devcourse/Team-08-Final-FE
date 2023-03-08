'use client';

import { Flex } from '@chakra-ui/react';

import MeetingInfo from '@/ui/MeetingDetail/MeetingInfo';
import CommentInputBox from '@/ui/MeetingDetail/CommentInputBox';
import CommentsList from '@/ui/MeetingDetail/CommentsList';
import useMeetingInfoQuery from '@/queries/meeting/useMeetingInfoQuery';
import useMeetingCommentsQuery from '@/queries/meeting/useMeetingCommentsQuery';
import MeetingAPI from '@/apis/Meeting';

interface MeetingDetailProps {
  bookGroupId: number;
}

const MeetingDetail = ({ bookGroupId }: MeetingDetailProps) => {
  const meetingInfoQuery = useMeetingInfoQuery({ bookGroupId });
  const meetingCommentsQuery = useMeetingCommentsQuery({ bookGroupId });

  const isSuccess =
    meetingInfoQuery.isSuccess && meetingCommentsQuery.isSuccess;
  if (!isSuccess) return null;

  const handleParticipateBtnClick = async () => {
    try {
      await MeetingAPI.postMeetingJoin({ bookGroupId });
    } catch (error) {
      console.error(error);
    }
    meetingInfoQuery.refetch();
  };

  const handleCreateCommentBtnClick = () => {
    console.log('댓글을 생성했습니다.');
    /*댓글 작성하기 버튼 클릭시,
      1) 댓글 생성 API 호출 예정
      2) 댓글 리스트 API 재호출 예정
      3) commentsListData update*/
  };

  const handleModifyCommentBtnClick = (modifiedComment: string) => {
    console.log('댓글이 수정되었습니다.');
    console.log(modifiedComment);
    /*댓글 수정하기 버튼 클릭시,
      1) 댓글 수정 API 호출
      2) 댓글 리스트 API 호출
      3) commentsListData update*/
  };

  const handleDeleteCommentBtnClick = () => {
    console.log('댓글이 삭제되었습니다.');
    /*댓글 삭제하기 버튼 클릭시,
      1) 댓글 삭제 API 호출
      2) 댓글 리스트 API 호출
      3) commentsListData update*/
  };

  return (
    <Flex px="5%" direction="column" justify="center" mt="1rem">
      <MeetingInfo
        meetingInfoData={meetingInfoQuery.data}
        handleParticipateBtnClick={handleParticipateBtnClick}
      />
      <CommentInputBox
        isPartInUser={meetingInfoQuery.data.isGroupMember}
        handleCreateCommentBtnClick={handleCreateCommentBtnClick}
      />
      <CommentsList
        commentsListData={meetingCommentsQuery.data.bookGroupComments}
        handleDeleteCommentBtnClick={handleDeleteCommentBtnClick}
        handleModifyCommentBtnClick={handleModifyCommentBtnClick}
      />
    </Flex>
  );
};

export default MeetingDetail;
