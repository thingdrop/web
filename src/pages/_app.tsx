import { store } from '@/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/theme';
import { GlobalStyle, ToastProvider } from '@/components';
import '@/styles/reset.css';

type AppProps = {
  Component: any;
  pageProps: any;
};

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ToastProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
