import { APIBookshelf } from '@/types/bookshelf';
import { Flex, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import IconButton from '../../common/IconButton';
import InteractiveBookShelf from '../../InteractiveBookShelf';

const ProfileBookshelfPresenter = ({
  bookshelfId,
  bookshelfName,
  books,
}: APIBookshelf) => {
  return (
    <VStack align="flex-start" gap="1rem" w="100%">
      <Flex
        as={Link}
        href={`/bookshelf/${bookshelfId}`}
        align="center"
        w="100%"
        justify="space-between"
      >
        <Text fontSize="md" fontWeight="bold">
          {`${bookshelfName}`}
        </Text>
        <IconButton name="more-circle" size="1.6rem" fill />
      </Flex>
      {books.length === 0 ? (
        <Text fontSize="md">책장이 비어있습니다.</Text>
      ) : (
        <InteractiveBookShelf books={books} />
      )}
    </VStack>
  );
};

export default ProfileBookshelfPresenter;
