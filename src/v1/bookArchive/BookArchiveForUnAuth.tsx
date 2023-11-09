'use client';

import useUnAuthRecommendedBookshelfQuery from '@/queries/recommend/useUnAuthRecommendedBookshelfQuery';
import BookShelfCard from '@/v1/bookShelf/BookShelfCard';

const BookArchiveForUnAuth = () => {
  const { data, isSuccess, isLoading } = useUnAuthRecommendedBookshelfQuery();

  if (isLoading) {
    // TODO: 스켈레톤 컴포넌트로 교체
    return null;
  }
  if (!isSuccess) return null;

  return (
    <div className="flex w-full flex-col gap-[1.5rem] text-md font-bold">
      <div>🔥 인기 책장</div>
      {...data.bookshelfResponses.map(bookShelf => (
        <BookShelfCard key={bookShelf.bookshelfId} {...bookShelf} />
      ))}
    </div>
  );
};

export default BookArchiveForUnAuth;
