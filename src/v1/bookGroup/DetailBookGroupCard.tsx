import Badge from '@/v1/base/Badge';
import Avatar from '@/v1/base/Avatar';
import { IconCalendar, IconMembers, IconComments } from '@public/icons';
import BookCover from '@/v1/book/BookCover';
import Link from 'next/link';
import BookGroupStatus from './BookGroupStatus';

interface DetailBookGroupCardProps {
  title: string;
  description: string;
  bookImageSrc: string;
  date: { start: string; end: string };
  owner: { name: string; profileImageSrc: string };
  memberCount: number;
  commentCount: number;
  isPublic: boolean;
  bookGroupId: number;
}

const DetailBookGroupCard = ({
  title,
  description,
  bookImageSrc,
  date,
  owner,
  memberCount,
  commentCount,
  isPublic,
  bookGroupId,
}: DetailBookGroupCardProps) => {
  return (
    <Link href={`/group/${bookGroupId}`}>
      <article className="w-full rounded-[0.4rem] p-[1.5rem] shadow-bookgroup-card">
        <div className="flex gap-[0.5rem]">
          <BookGroupStatus start={date.start} end={date.end} />
          <Public isPublic={isPublic} />
        </div>
        <div className="flex justify-between gap-[1.5rem] pt-[1rem]">
          <div className="flex min-w-0 flex-grow flex-col justify-between ">
            <Title title={title} />
            <Description description={description} />
            <Duration start={date.start} end={date.end} />
            <div className="flex justify-between">
              <Owner
                name={owner.name}
                profileImageSrc={owner.profileImageSrc}
              />
              <div className="flex gap-[0.5rem]">
                <MemberCount memberCount={memberCount} />
                <CommentCount commentCount={commentCount} />
              </div>
            </div>
          </div>
          <BookCover src={bookImageSrc} size="medium" />
        </div>
      </article>
    </Link>
  );
};

export default DetailBookGroupCard;

const Public = ({ isPublic }: { isPublic: boolean }) => (
  <Badge size="large" colorScheme="grey">
    {isPublic ? '공개' : '비공개'}
  </Badge>
);

const Title = ({ title }: { title: string }) => {
  return <p className="min-w-0 truncate text-md font-bold">{title}</p>;
};

const Description = ({ description }: { description: string }) => {
  return <p className="min-w-0 truncate text-sm">{description}</p>;
};

const Duration = ({ start, end }: { start: string; end: string }) => {
  const formatDateTime = (dateString: string) =>
    new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(dateString));

  return (
    <div className="flex items-center gap-[0.5rem]">
      <IconCalendar className="w-[1.2rem] fill-placeholder" />
      <p className="text-xs text-placeholder">
        {formatDateTime(start)} - {formatDateTime(end)}
      </p>
    </div>
  );
};

const Owner = ({
  name,
  profileImageSrc,
}: {
  name: string;
  profileImageSrc: string;
}) => {
  return (
    <div className="flex h-[2rem] gap-[0.5rem]">
      <Avatar name={name} src={profileImageSrc} size="small" />
      <div className="flex items-center text-xs">
        <p>{name}</p>
      </div>
    </div>
  );
};

const MemberCount = ({ memberCount }: { memberCount: number }) => {
  return (
    <div className="flex items-center gap-[0.3rem]">
      <IconMembers className="h-[0.9rem] w-[1.3rem] fill-placeholder" />
      <p className="text-xs text-placeholder">{memberCount}</p>
    </div>
  );
};

const CommentCount = ({ commentCount }: { commentCount: number }) => {
  return (
    <div className="flex items-center gap-[0.3rem]">
      <IconComments className="h-[1.2rem] w-[1.2rem] fill-placeholder" />
      <p className="text-xs text-placeholder">{commentCount}</p>
    </div>
  );
};

export const DetailBookGroupCardSkeleton = () => (
  <div className="w-full animate-pulse rounded-[0.5rem] p-[1.5rem] shadow-bookgroup-card">
    <div className="flex gap-[0.5rem]">
      <div className="h-[1.9rem] w-[4.8rem] rounded-[0.5rem] bg-black-400" />
      <div className="h-[2rem] w-[3.8rem] rounded-[0.5rem] bg-black-400" />
    </div>
    <div className="flex justify-between gap-[1.5rem] pt-[1rem]">
      <div className="flex flex-grow flex-col justify-between ">
        <div className="h-[2.2rem] w-[65%] bg-black-400" />
        <div className="h-[1.3rem] w-[75%] bg-black-400" />
        <div className="h-[1.3rem] w-[60%] bg-black-400" />
        <div className="flex w-full items-center gap-[0.5rem]">
          <div className="h-[2rem] w-[2rem] rounded-full bg-black-400" />
          <div className="h-[1.3rem] w-[4rem] bg-black-400" />
          <div className="flex-grow" />
          <div className="h-[1.3rem] w-[5rem] bg-black-400" />
        </div>
      </div>
      <div className="h-[10.5rem] w-[7.5rem] rounded-[0.5rem] bg-black-400"></div>
    </div>
  </div>
);
