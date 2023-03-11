import type { RegisterOptions } from 'react-hook-form';

const FORM_RULES: {
  [index: string]: RegisterOptions;
} = {
  nickname: {
    required: '닉네임을 입력해주세요.',
    minLength: {
      value: 2,
      message: '닉네임을 2자 이상 입력해주세요.',
    },
    maxLength: {
      value: 10,
      message: '닉네임을 10자 이하로 입력해주세요.',
    },
    pattern: {
      value: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{2,10}$/,
      message: '한글, 영문, 숫자만 입력 가능해요.',
    },
  },
  email: {
    required: '이메일을 입력해주세요',
    pattern: {
      value:
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      message: '이메일 형식을 다시 확인해주세요.',
    },
  },
  jobGroup: {
    required: '직군을 선택해주세요.',
  },
  job: {
    required: '직업을 선택해주세요.',
  },
  title: {
    required: '모임 제목을 입력해 주세요.',
    minLength: {
      value: 2,
      message: '모임 제목을 2자 이상 입력해 주세요.',
    },
    maxLength: {
      value: 30,
      message: '모임 제목을 30자 이하로 입력해 주세요.',
    },
  },
  introduce: {
    required: '모임 설명을 입력해 주세요.',
    minLength: {
      value: 10,
      message: '모임 설명을 10자 이상 입력해 주세요.',
    },
    maxLength: {
      value: 150,
      message: '모임 설명을 150자 이하로 입력해 주세요.',
    },
  },
  maxMemberCount: {
    required: '모임 인원을 입력해 주세요.',
    min: {
      value: 1,
      message: '모임 인원을 1명 이상 입력해 주세요.',
    },
    max: {
      value: 500,
      message: '인원이 너무 많습니다.',
    },
    pattern: {
      value: /^[0-9]+$/,
      message: '숫자를 입력해 주세요.',
    },
  },
  startDate: {
    required: '모임 시작일을 선택해 주세요.',
    validate: value =>
      new Date(value).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0) ||
      '시작일은 오늘부터 가능해요.',
  },
  endDate: {
    required: '모임 종료일을 선택해 주세요.',
    validate: {
      possible: (_, { startDate, endDate }) =>
        new Date(startDate) <= new Date(endDate) ||
        '종료일은 시작일보다 늦어야 해요.',
    },
  },
  bookId: {
    required: true,
    validate: {
      positive: value => Number(value) > 0,
    },
  },
  joinQuestion: {
    required: '문제 설명을 입력해 주세요.',
    minLength: {
      value: 5,
      message: '문제 설명을 5자 이상 입력해 주세요.',
    },
    maxLength: {
      value: 30,
      message: '문제 설명을 30자 이하로 입력해 주세요.',
    },
  },
  joinPasswd: {
    required: '정답을 입력해 주세요.',
    minLength: {
      value: 1,
      message: '정답을 1자 이상 입력해 주세요.',
    },
    maxLength: {
      value: 30,
      message: '정답을 10자 이하로 입력해 주세요.',
    },
    pattern: {
      value: /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]{1,10}$/,
      message: '띄어쓰기 없이 정답을 입력해 주세요.',
    },
  },
} as const;

export default FORM_RULES;
