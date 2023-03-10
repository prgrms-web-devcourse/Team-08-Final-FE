'use client';

import { APIBook } from '@/types/book';
import { Box, Flex } from '@chakra-ui/react';
import { usePalette } from 'color-thief-react';
import Link from 'next/link';
import InteractiveBookFront from './InteractiveBookFront';
import InteractiveBookSide from './InteractiveBookSide';
import InteractiveBookTop from './InteractiveBookTop';

const BOOK_WIDTH = 8.5;
const BOOK_HEIGHT = 11;
const BOOK_THICK = 2;

const InteractiveBook = ({
  imageUrl,
  bookId,
}: Pick<APIBook, 'imageUrl' | 'bookId'>) => {
  const { data } = usePalette(
    '/api/book/image?' + new URLSearchParams({ url: imageUrl }),
    2,
    'hex'
  );

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      style={{
        transformStyle: 'preserve-3d',
        transform: 'translate3d(0,0,0)',
        perspective: '30rem',
      }}
    >
      {data && (
        <Box
          as={Link}
          href={`/book/${bookId}`}
          sx={{
            width: `${BOOK_WIDTH}rem`,
            height: `${BOOK_HEIGHT}rem`,
            transformStyle: 'preserve-3d',
            transform: 'translateX(0.5rem) rotateY(30deg)',
            transition: '0.8s ease',

            '> div, img': {
              position: 'absolute',
              boxSizing: 'border-box',
              transformOrigin: 'top left',
            },
          }}
        >
          <InteractiveBookTop bookThick={BOOK_THICK} />
          <InteractiveBookSide bookColor={data[0]} bookThick={BOOK_THICK} />
          <InteractiveBookFront imageUrl={imageUrl} />
        </Box>
      )}
    </Flex>
  );
};

export default InteractiveBook;
