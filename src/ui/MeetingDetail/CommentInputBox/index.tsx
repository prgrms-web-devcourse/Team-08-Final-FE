import { Box, Flex, Textarea, Button, Avatar } from '@chakra-ui/react';
import { useState } from 'react';
interface CommentInputBoxProps {
  isPartInUser: boolean;
  handleCreateCommentBtnClick: (comment: string) => void;
  userNickname: string | undefined | null;
  userAvatar: string | undefined;
}

const CommentInputBox = ({
  isPartInUser,
  handleCreateCommentBtnClick,
  userNickname,
  userAvatar,
}: CommentInputBoxProps) => {
  const [commentValue, setCommentValue] = useState('');

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(event.target.value);
  };

  return (
    <Box mt="1.5rem" h="100%">
      <Box fontSize="lg" fontWeight={700} mb="1rem">
        댓글 작성
      </Box>
      <Box p="1rem" bgColor="white" borderRadius="1rem" boxShadow="default">
        <Flex>
          <Box>
            <Avatar src={userAvatar} loading="lazy" />
          </Box>
          <Flex align="center" ml="1rem">
            <Box fontSize="sm" fontWeight={600}>
              {userNickname ? userNickname : '로그인 후 이용해 주세요.'}
            </Box>
          </Flex>
        </Flex>
        <Box m="1rem 0">
          <Textarea
            bgColor="white.800"
            w="100%"
            h="12rem"
            fontSize="md"
            placeholder={
              isPartInUser
                ? '댓글을 작성해 주세요.'
                : '모임에 참여해야 글을 작성할 수 있습니다.'
            }
            isDisabled={!isPartInUser}
            value={commentValue}
            onChange={handleOnChange}
          />
        </Box>
        <Flex justify="flex-end">
          <Button
            fontSize="sm"
            fontWeight="500"
            w="30%"
            borderRadius="2rem"
            color="main"
            backgroundColor="white.900"
            border="0.1rem solid"
            isDisabled={!isPartInUser}
            onClick={() => {
              handleCreateCommentBtnClick(commentValue);
              setCommentValue('');
            }}
          >
            작성하기
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default CommentInputBox;
