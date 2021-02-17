import { createContext, useState, useEffect } from 'react';
import { COLORS } from '@/constants';

const defaultState = {
  colorMode: undefined,
  setColorMode: undefined,
};

export const ThemeContext = createContext(defaultState);

type ThemeProviderProps = {
  children: any;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [colorMode, rawSetColorMode] = useState(undefined);
  useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      '--initial-color-mode',
    );
    rawSetColorMode(initialColorValue);
  }, []);

  const setColorMode = (value) => {
    const root = window.document.documentElement;
    // 1. Update React color-mode state
    rawSetColorMode(value);
    // 2. Update localStorage
    localStorage.setItem('color-mode', value);
    // 3. Update each color
    Object.entries(COLORS).forEach(([name, colorByTheme]) => {
      const cssVarName = `--color-${name}`;
      root.style.setProperty(cssVarName, colorByTheme[value]);
    });
    root.style.setProperty('--initial-color-mode', colorMode);
  };
  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function setColorsByTheme() {
  function getInitialColorMode() {
    const persistedColorPreference = window.localStorage.getItem('color-mode');
    const hasPersistedPreference = typeof persistedColorPreference === 'string';
    // If the user has explicitly chosen light or dark,
    // let's use it. Otherwise, this value will be null.
    if (hasPersistedPreference) {
      return persistedColorPreference;
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDarkFromMQ = mql.matches;
    const colorMode = prefersDarkFromMQ ? 'dark' : 'light';
    return colorMode;
  }

  const colors = '🌈';
  const colorMode = getInitialColorMode();

  const root = document.documentElement;

  Object.entries(colors).forEach(([name, colorByTheme]) => {
    const cssVarName = `--color-${name}`;

    root.style.setProperty(cssVarName, colorByTheme[colorMode]);
  });
  root.style.setProperty('--initial-color-mode', colorMode);
}

export function MagicScriptTag() {
  const functionString = String(setColorsByTheme).replace(
    "'🌈'",
    JSON.stringify(COLORS),
  );

  const codeToRunOnClient = `(${functionString})()`;

  // xeslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
}

// if user doesn't have JavaScript enabled, set variables properly in a
// head style tag anyways (light mode)
export function FallbackStyles() {
  const cssVariableString = Object.entries(COLORS).reduce(
    (acc, [name, colorByTheme]) => {
      return `${acc}\n--color-${name}: ${colorByTheme.light};`;
    },
    '',
  );

  const wrappedInSelector = `html { ${cssVariableString} }`;

  return <style>{wrappedInSelector}</style>;
}
