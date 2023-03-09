import {
  Box,
  Center,
  Flex,
  Image,
  useDisclosure,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';

import FormInput from '@/ui/FormInput';
import FormRadio from '@/ui/FormRadio';
import BottomSheet from '@/ui/common/BottomSheet';
import BookSearch from '@/ui/BookSearch';
import IconButton from '@/ui/common/IconButton';
import { useState } from 'react';
import { APIBook } from '@/types/book';
import MeetingAPI from '@/apis/Meeting';
import { useRouter } from 'next/navigation';
import { MAX_MEMBER_COUNT_VAlUE } from './radioValues';
import { MAX_MEMBER_DEFAULT_VALUE } from './radioValues';
import { IS_PUBLICK_VALUE } from './radioValues';
import { IS_PUBLICK_DEFAULT_VALUE } from './radioValues';
import { HAS_JOIN_PASSWORD_VALUE } from './radioValues';
import { HAS_JOIN_PASSWORD_DEFAULT_VALUE } from './radioValues';
import { APICreateMeetingReqeust } from '@/types/meeting';

// interface DefaultValues
//   extends Omit<
//     APICreateMeetingReqeust,
//     'maxMemberCount' | 'hasJoinPasswd' | 'isPubilc'
//   > {
//   hasJoinPasswd: string | number;
//   maxMemberCount: string | number | null;
//   isPublic: string | boolean;
// }

// const defaultValues: DefaultValues = {
//   bookId: 0,
//   title: '',
//   introduce: '',
//   maxMemberCount: '',
//   startDate: '',
//   endDate: '',
//   hasJoinPasswd: '',
//   isPublic: '',
// };

const AddMeetingForm = () => {
  const [selectedBook, setSeletedBook] = useState<APIBook>();

  const date = new Date();
  const today = Date.now();
  const startDate = new Date(today - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

  const methods = useForm({
    mode: 'all',
    defaultValues: {
      bookId: 0,
      title: '',
      introduce: '',
      maxMemberCount: 100,
      startDate,
      endDate: '',
      hasJoinPasswd: false,
      isPublic: true,
    },
  });
  const theme = useTheme();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const router = useRouter();
  // const handleInputSubmit: Parameters<
  //   typeof methods.handleSubmit
  // >[0] = async meeting => {
  //   const request = {
  //     ...meeting,
  //     maxMemberCount:
  //       meeting.maxMemberCount === 'null'
  //         ? null
  //         : Number(meeting.maxMemberCount),
  //     isPublic: meeting.isPublic === 'true' ? true : false,
  //   };
  // };

  const onSubmit = async (meeting: APICreateMeetingReqeust) => {
    try {
      await MeetingAPI.createMeeting({ meeting });
      router.replace('/meeting');
    } catch (error) {
      console.error(error);
    }
  };

  /* radio의 value의 타입은 string | undefined만 들어갈 수 있습니다. */
  return (
    <>
      <FormProvider {...methods}>
        <Box as="form" w="100%" onSubmit={methods.handleSubmit(onSubmit)}>
          <Box
            onClick={onOpen}
            fontSize="md"
            maxH="18rem"
            w="fit-content"
            mx="auto"
            border={
              methods.getFieldState('bookId').error
                ? `2px solid ${theme.colors.red['500']}`
                : 'none'
            }
          >
            {selectedBook && selectedBook.imageUrl ? (
              <Image src={selectedBook.imageUrl} alt="book-cover" />
            ) : (
              <Center
                borderRadius={10}
                bgColor="white"
                w="12rem"
                h="17.4rem"
                textAlign="center"
              >
                책을
                <br />
                선택해주세요.
              </Center>
            )}
          </Box>
          <Flex direction="column" gap="2rem" align="center">
            <Box display="none">
              <FormInput label="" name="bookId" />
            </Box>
            <FormInput label="제목" name="title" />
            <FormInput label="설명" name="introduce" />
            <FormRadio
              label="참여 인원"
              name="maxMemberCount"
              radioValues={MAX_MEMBER_COUNT_VAlUE}
              defaultValue={MAX_MEMBER_DEFAULT_VALUE}
            />
            <FormRadio
              label="댓글 공개 여부"
              name="isPublic"
              radioValues={IS_PUBLICK_VALUE}
              defaultValue={IS_PUBLICK_DEFAULT_VALUE}
            />
            <FormRadio
              label="모임 가입 문제"
              name="hasJoinPasswd"
              radioValues={HAS_JOIN_PASSWORD_VALUE}
              defaultValue={HAS_JOIN_PASSWORD_DEFAULT_VALUE}
            />
            <FormInput label="시작일" name="startDate" type="date" />
            <FormInput label="종료일" name="endDate" type="date" />
          </Flex>
          <Box
            as="button"
            w="100%"
            mt="4rem"
            px="2rem"
            py="1rem"
            disabled={methods.formState.isSubmitting}
            color={theme.colors.main}
            border="1px solid"
            borderRadius="5rem"
            fontSize="md"
            _disabled={{
              color: `${theme.colors.black['500']}`,
              border: '1px solid',
            }}
          >
            모임 생성하기
          </Box>
        </Box>
      </FormProvider>
      <BottomSheet isOpen={isOpen} onClose={onClose}>
        <VStack px="2rem" py="2rem" h="95vh" gap="1rem" overflow="scroll">
          <IconButton
            name="close"
            onClick={onClose}
            alignSelf="flex-end"
            tabIndex={-1}
          />
          <BookSearch
            onBookClick={book => {
              setSeletedBook(book);
              methods.setValue('bookId', book.bookId);
              onClose();
            }}
          />
        </VStack>
      </BottomSheet>
    </>
  );
};

export default AddMeetingForm;
