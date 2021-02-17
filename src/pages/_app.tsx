import { ThemeProvider } from '@/theme';
import { GlobalStyle } from '@/components';
import '@/styles/reset.css';

type AppProps = {
  Component: any;
  pageProps: any;
};

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
