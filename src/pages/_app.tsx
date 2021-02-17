import { ThemeProvider } from '@/theme';
import { GlobalStyle } from '@/components';
import '@/styles/reset.css';

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
