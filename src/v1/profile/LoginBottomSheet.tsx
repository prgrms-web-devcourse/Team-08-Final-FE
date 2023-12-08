import { IconClose, IconKakao, LogoWithText } from '@public/icons';

import Button from '@/v1/base/Button';
import BottomSheet from '@/v1/base/BottomSheet';

type LoginBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * @todo
 * client_id를 활용한 카카오 로그인 페이지 이동
 */

const LoginBottomSheet = ({ isOpen, onClose }: LoginBottomSheetProps) => {
  const handleClickKakaoLogin = () => {
    return (location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorize/kakao?redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_REDIRECT_URI}`);
    // return (location.href = `${process.env.NEXT_PUBLIC_KAKAO_LOGIN_URL}`);
  };

  return (
    <BottomSheet isShow={isOpen} onClose={onClose}>
      <IconClose
        className="absolute right-0 top-0 mr-[2rem] mt-[2rem] h-[2rem] w-[2rem] cursor-pointer fill-black-900"
        onClick={onClose}
      />
      <div className="m-auto flex w-full max-w-[38rem] flex-col items-center gap-[2.5rem] px-[2rem] pt-[5rem]">
        <LogoWithText className="h-auto w-[6rem]" />
        <p className="text-lg font-bold text-black-700">
          로그인이 필요한 서비스에요!
        </p>
        <p className="whitespace-pre-line text-center text-sm font-normal text-placeholder">
          간편하게 카카오로 로그인을 하고,
          <br />
          <span className="text-main-900">다독다독</span>의 다양한 기능을
          이용해보세요.
        </p>
        <Button onClick={handleClickKakaoLogin} colorScheme="kakao" size="full">
          <div className="flex w-full items-center justify-center gap-[1rem]">
            <IconKakao className="h-auto w-[1.6rem]" />
            <p className="text-md font-normal">카카오 로그인</p>
          </div>
        </Button>
      </div>
    </BottomSheet>
  );
};

export default LoginBottomSheet;
