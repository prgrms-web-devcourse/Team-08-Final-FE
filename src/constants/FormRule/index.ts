export const nickNameRule = {
  required: '닉네임을 입력해주세요.',
  minLength: {
    value: 2,
    message: '닉네임을 2자 이상 입력해주세요.',
  },
  maxLength: {
    value: 10,
    message: '닉네임을 10자 이하로 입력해주세요.',
  },
};

export const emailRule = {
  required: '이메일을 입력해주세요',
  pattern: {
    value:
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    message: '이메일 형식을 다시 확인해주세요.',
  },
};

export const jobRule = {
  required: '직군을 입력해주세요.',
};
