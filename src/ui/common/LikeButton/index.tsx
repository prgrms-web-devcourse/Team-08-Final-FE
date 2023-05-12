import { APIBookshelfInfo } from '@/types/bookshelf';
import IconButton from '@/ui/common/IconButton';
import { Box, Flex, Text, useTheme } from '@chakra-ui/react';

interface LikeButtonTypes {
  isButton?: boolean;
  isLiked?: APIBookshelfInfo['isLiked'];
  likeCount: APIBookshelfInfo['likeCount'];
}

const LikeButton = ({
  isButton = true,
  isLiked,
  likeCount,
}: LikeButtonTypes) => {
  const theme = useTheme();

  /**
   * @todo
   * POST, DELETE 메서드 작성
   * bookshelfId props로 받기
   * onClick시 isLike 값에 따라 POST, DELETE 실행
   */

  return (
    <Box
      as={isButton ? 'button' : 'div'}
      p={isButton ? '0.6rem 0.8rem' : '0.4rem 0.6rem'}
      w="5.4rem"
      h="2.4rem"
      fontSize="xs"
      color={isLiked ? theme.colors.white['800'] : theme.colors.red['800']}
      bg={isLiked ? theme.colors.red['800'] : theme.colors.white['800']}
      border="solid 0.1rem"
      borderColor={
        isButton ? theme.colors.red['800'] : theme.colors.white['800']
      }
      borderRadius="1.6rem"
    >
      <Flex w="100%" h="100%" gap="0.2rem" justify="flex-start" align="center">
        <IconButton
          as="div"
          name="like"
          size={isButton ? '1.3rem' : '1.5rem'}
          strokeWidth={'0.05rem'}
          color={isLiked ? theme.colors.white['800'] : theme.colors.red['800']}
          fill={true}
        />
        <Text w="2rem" fontWeight="900">
          {likeCount ? likeCount : 0}
        </Text>
      </Flex>
    </Box>
  );
};

export default LikeButton;
