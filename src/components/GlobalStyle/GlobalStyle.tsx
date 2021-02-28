import { createGlobalStyle } from 'styled-components';
import {
  SPACING,
  FONT,
  FONT_WEIGHT,
  FONT_SIZE,
  BORDER,
  BORDER_RADIUS,
  TIMING,
} from '@/constants';

const GlobalStyle = createGlobalStyle`
  html {
    /* Timing */
    --timing-faster: ${TIMING.faster};
    --timing-fast: ${TIMING.fast};
    --timing-medium: ${TIMING.medium};
    --timing-slow: ${TIMING.slow};
    /* Stroke */
    --border-thin: ${BORDER.thin};
    --border-medium: ${BORDER.medium};
    --border-thick: ${BORDER.thick};
    /* Border Radius */
    --border-radius-small: ${BORDER_RADIUS.small};
    --border-radius-medium: ${BORDER_RADIUS.medium};
    --border-radius-large: ${BORDER_RADIUS.large};
    /* Spacing */
    --spacing-tightest: ${SPACING.tightest};
    --spacing-tighter: ${SPACING.tighter};
    --spacing-tight: ${SPACING.tight};
    --spacing-medium: ${SPACING.medium};
    --spacing-loose: ${SPACING.loose};
    --spacing-looser: ${SPACING.looser};
    --spacing-loosest: ${SPACING.loosest};
    /* Font */
    --font-body: ${FONT.body};
    --font-heading: ${FONT.heading};
    --font-monospace: ${FONT.monospace};
    /* Font Weight */
    --font-weight-light: ${FONT_WEIGHT.light};
    --font-weight-medium: ${FONT_WEIGHT.medium};
    --font-weight-heavy: ${FONT_WEIGHT.heavy};
    /* Font Size */
    --font-size-smallest: ${FONT_SIZE.smallest};
    --font-size-smaller: ${FONT_SIZE.smaller};
    --font-size-small: ${FONT_SIZE.small};
    --font-size-medium: ${FONT_SIZE.medium};
    --font-size-large: ${FONT_SIZE.large};
    --font-size-larger: ${FONT_SIZE.larger};
    --font-size-largest: ${FONT_SIZE.largest};
  }

  html, body {
    height: 100%;
    scroll-behavior: smooth;
  }

  body {
    background: var(--color-background);
    color: var(--color-text);
    transition: background var(--timing-faster) ease, color var(--timing-faster) ease;
    font-family: var(--font-body);
  }

  #__next {
    height: 100%;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
  }
`;

export default GlobalStyle;
