import BookInfo from '@/ui/BookDetail/BookInfo';
import type { APIBookInfo } from '@/types/book';

const BookDetailPage = () => {
  const { bookId, title, author, contents, imageUrl }: APIBookInfo = {
    title: '미움받을 용기',
    author: '기시미 이치로, 고가 후미타케',
    isbn: '9788996991342',
    contents:
      '인간은 변할 수 있고, 누구나 행복해 질 수 있다. 단 그러기 위해서는 ‘용기’가 필요하다고 말한 철학자가 있다.',
    url: 'https://search.daum.net/search?w=bookpage&bookId=1467038&q=%EB%AF%B8%EC%9B%80%EB%B0%9B%EC%9D%84+%EC%9A%A9%EA%B8%B0',
    imageUrl:
      'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038',
    apiProvider: 'KAKAO',
    publisher: '인플루엔셜',
    imageKey:
      '687f74fd-a612-4ec9-9ae5-8f7b7fe8e80f/photo-1606787364406-a3cdf06c6d0c.jpeg',
    bookId: 123,
  };

  return (
    <>
      <BookInfo
        bookId={bookId}
        title={title}
        author={author}
        imageUrl={imageUrl}
        contents={contents}
      />
      {/** @todo BookComment 컴포넌트 구현 */}
    </>
  );
};

export default BookDetailPage;
