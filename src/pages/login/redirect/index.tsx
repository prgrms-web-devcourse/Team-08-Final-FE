import { Flex, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { setAuth } from '@/utils/helpers';
import userAPI from '@/apis/user';

const RedirectPage = () => {
  const router = useRouter();

  const { access_token: accessToken } = router.query as {
    access_token?: string;
  };

  const checkSavedAdditionalInfo = useCallback(async () => {
    const isSavedAdditionalInfo = await userAPI.getMyProfile().then(
      ({
        data: {
          job: { jobName, jobGroupName },
          nickname,
        },
      }) => !!(nickname && jobGroupName && jobName)
    );

    if (!isSavedAdditionalInfo) {
      router.replace('/profile/me/add');
    }

    router.replace('/bookarchive');
  }, [router]);

  useEffect(() => {
    const hasAccessToken = !!accessToken;

    if (hasAccessToken) {
      accessToken && setAuth(accessToken);
      checkSavedAdditionalInfo();
    }
  }, [accessToken, checkSavedAdditionalInfo]);

  return (
    <Flex align="center" justify="center" height="95vh">
      <Spinner />
    </Flex>
  );
};

export default RedirectPage;
