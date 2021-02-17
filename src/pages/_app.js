import { ThemeProvider } from "@/constants/theme";
import "@/styles/reset.css";
import { GlobalStyle } from "@/components";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
