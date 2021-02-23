import { ThemeProvider } from '@/theme';
import { GlobalStyle, ToastProvider } from '@/components';
import '@/styles/reset.css';

type AppProps = {
  Component: any;
  pageProps: any;
};

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
