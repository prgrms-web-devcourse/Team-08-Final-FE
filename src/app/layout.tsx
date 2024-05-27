import ContextProvider from '@/components/ContextProvider';
import AuthFailedErrorBoundary from '@/components/AuthFailedErrorBoundary';
import Layout from '@/v1/layout/Layout';

import { LineSeedKR } from '@/styles/font';
import '@/styles/global.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <title>다독다독</title>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=1"
          name="viewport"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      {/* @todo Chakra 제거시 app-layout 프로퍼티 제거. */}
      <body className={`${LineSeedKR.variable} app-layout font-lineseed`}>
        <Layout>
          <ContextProvider>
            <AuthFailedErrorBoundary>{children}</AuthFailedErrorBoundary>
          </ContextProvider>
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
