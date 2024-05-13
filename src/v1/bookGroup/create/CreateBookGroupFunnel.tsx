'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import type { CreateBookGroupFormValues } from './types';
import useCreateBookGroupMutation from '@/queries/group/useCreateBookGroupMutation';

import { useFunnel } from '@/hooks/useFunnel';
import useToast from '@/v1/base/Toast/useToast';
import { getTodayDate } from '@/utils/date';
import { isAxiosErrorWithCustomCode } from '@/utils/helpers';
import { SERVICE_ERROR_MESSAGE } from '@/constants';

import { IconArrowLeft } from '@public/icons';
import TopNavigation from '@/v1/base/TopNavigation';
import {
  EnterTitleStep,
  SelectBookStep,
  SelectJoinTypeStep,
  SetUpDetailStep,
} from './steps';

const FUNNEL_STEPS = [
  'SelectBook',
  'EnterTitle',
  'SetUpDetail',
  'SelectJoinType',
] as const;

const CreateBookGroupFunnel = () => {
  const router = useRouter();
  const [Funnel, setStep, currentStep] = useFunnel(FUNNEL_STEPS, {
    initialStep: 'SelectBook',
  });
  const { show: showToast } = useToast();
  const { mutate } = useCreateBookGroupMutation();

  const methods = useForm<CreateBookGroupFormValues>({
    mode: 'all',
    defaultValues: {
      title: '',
      maxMemberCount: 9999,
      startDate: getTodayDate(),
      isPublic: false,
      hasJoinPassword: 'false',
    },
  });

  const handleBackButtonClick = () => {
    const currentStepIndex = FUNNEL_STEPS.indexOf(currentStep);

    if (currentStepIndex === 0 || currentStepIndex === -1) {
      router.back();
    } else {
      setStep(FUNNEL_STEPS[currentStepIndex - 1]);
    }

    return;
  };

  const handleCreateGroupSubmit: SubmitHandler<
    CreateBookGroupFormValues
  > = formValues => {
    const requestBody = {
      bookId: formValues.book.bookId,
      title: formValues.title,
      introduce: formValues.introduce,
      maxMemberCount:
        formValues.maxMemberCount !== 'custom'
          ? formValues.maxMemberCount
          : formValues.customMemberCount,
      startDate: formValues.startDate,
      endDate: formValues.endDate,
      isPublic: formValues.isPublic,
      hasJoinPasswd: formValues.hasJoinPassword === 'true' ? true : false,
      joinQuestion: formValues.joinQuestion,
      joinPasswd: formValues.joinPassword,
    };

    mutate(requestBody, {
      onSuccess: data => {
        router.replace(`/group/${data.bookGroupId}`);
        showToast({ type: 'success', message: '독서모임을 생성했어요! 🎉' });

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
          message: '독서 모임을 생성하지 못했어요 🥲',
        });
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <TopNavigation>
        <TopNavigation.LeftItem>
          <IconArrowLeft onClick={handleBackButtonClick} />
        </TopNavigation.LeftItem>
      </TopNavigation>

      <form>
        <Funnel>
          <Funnel.Step name="SelectBook">
            <SelectBookStep onNextStep={() => setStep('EnterTitle')} />
          </Funnel.Step>
          <Funnel.Step name="EnterTitle">
            <EnterTitleStep onNextStep={() => setStep('SetUpDetail')} />
          </Funnel.Step>
          <Funnel.Step name="SetUpDetail">
            <SetUpDetailStep
              goToSelectBookStep={() => setStep('SelectBook')}
              onNextStep={() => setStep('SelectJoinType')}
            />
          </Funnel.Step>
          <Funnel.Step name="SelectJoinType">
            <SelectJoinTypeStep
              onSubmit={methods.handleSubmit(handleCreateGroupSubmit)}
            />
          </Funnel.Step>
        </Funnel>
      </form>
    </FormProvider>
  );
};

export default CreateBookGroupFunnel;
