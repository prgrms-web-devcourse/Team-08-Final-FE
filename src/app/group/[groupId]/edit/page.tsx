'use client';

import { notFound, useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import {
  useBookGroupEditCurrentInfo,
  useBookGroupInfoMutation,
} from '@/queries/group/useBookGroupQuery';
import type { APIGroupDetail, APIEditBookGroup } from '@/types/group';

import { SERVICE_ERROR_MESSAGE } from '@/constants';
import {
  checkAuthentication,
  isAxiosErrorWithCustomCode,
} from '@/utils/helpers';

import useToast from '@/v1/base/Toast/useToast';
import BookGroupEditDateForm from '@/v1/bookGroup/edit/BookGroupEditDateForm';
import BookGroupEditIntroduceForm from '@/v1/bookGroup/edit/BookGroupEditIntroduceForm';
import BookGroupEditTitleForm from '@/v1/bookGroup/edit/BookGroupEditTitleForm';
import BookGroupEditTopNavigation from '@/v1/bookGroup/edit/BookGroupEditTopNavigation';

const BookGroupEditPage = ({
  params: { groupId },
}: {
  params: { groupId: APIGroupDetail['bookGroupId'] };
}) => {
  const router = useRouter();

  const isAuthenticated = checkAuthentication();

  const { data: bookGroupData } = useBookGroupEditCurrentInfo(groupId);
  const { isOwner, title, description, maxMemberCount, startDate, endDate } =
    bookGroupData;

  if (!isAuthenticated || !isOwner) {
    notFound();
  }

  const bookGroupEdit = useBookGroupInfoMutation(groupId);

  const { show: showToast } = useToast();

  const methods = useForm<Omit<APIEditBookGroup, 'isOwner'>>({
    mode: 'all',
    defaultValues: {
      title: title,
      introduce: description,
      maxMemberCount: maxMemberCount ? maxMemberCount : 9999,
      startDate: startDate,
      endDate: endDate,
    },
  });

  const handleFormSubmit: SubmitHandler<
    Omit<APIEditBookGroup, 'isOwner' | 'startDate'>
  > = async ({ title, introduce, maxMemberCount, endDate }) => {
    bookGroupEdit.mutate(
      { title, introduce, maxMemberCount, endDate },
      {
        onSuccess: () => {
          router.push(`/group/${groupId}`);

          showToast({ type: 'success', message: '모임 정보를 수정했어요! 🎉' });
          return;
        },
        onError: error => {
          if (isAxiosErrorWithCustomCode(error)) {
            const { code } = error.response.data;
            const message = SERVICE_ERROR_MESSAGE[code];

            showToast({ type: 'error', message });
            return;
          }

          showToast({
            type: 'error',
            message: '모임 정보 수정을 실패했어요 🥲',
          });
        },
      }
    );
  };

  return (
    <FormProvider {...methods}>
      <BookGroupEditTopNavigation onSubmit={handleFormSubmit} />

      <form
        className="mt-[2.5rem] flex flex-col gap-[3.2rem]"
        onSubmit={methods.handleSubmit(handleFormSubmit)}
      >
        <BookGroupEditTitleForm />
        <BookGroupEditIntroduceForm />
        <BookGroupEditDateForm />
      </form>
    </FormProvider>
  );
};

export default BookGroupEditPage;
