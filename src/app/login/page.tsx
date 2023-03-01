'use client';

import Image from 'next/image';
import { Flex, Heading, Highlight, VStack } from '@chakra-ui/react';

import Logo from '@/ui/common/Logo';
import Button from '@/ui/common/Button';

const LoginPage = () => {
  return (
    <Flex
      height="100vh"
      direction="column"
      align="center"
      justify="space-between"
      p="22vh 6rem"
      pos="relative"
      zIndex="1"
      bgColor="white.800"
    >
      <VStack w="100%" align="flex-start" spacing="3rem">
        <Logo width={65} />
        <Heading fontSize="2xl" fontWeight="medium">
          책에 대한 모든 이야기
          <br />
          <Highlight
            query="다독다독"
            styles={{ color: 'main', fontWeight: 'bold' }}
          >
            다독다독에서 함께 해요
          </Highlight>
        </Heading>
      </VStack>
      <Button scheme="kakao" fullWidth>
        <Image
          src="/images/kakao.svg"
          alt="카카오 로고"
          width={21}
          height={19}
          priority
        />
        카카오 로그인
      </Button>
    </Flex>
  );
};

export default LoginPage;
