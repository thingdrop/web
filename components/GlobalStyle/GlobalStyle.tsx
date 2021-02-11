import { createGlobalStyle } from 'styled-components';
import { SPACING, FONT, FONT_WEIGHT, FONT_SIZE } from '../../constants';

const GlobalStyle = createGlobalStyle`
  html {
    /* Spacing */
    --spacing-extra-tight: ${SPACING['extra-tight']};
    --spacing-tight: ${SPACING.tight};
    --spacing-medium: ${SPACING.medium};
    --spacing-loose: ${SPACING.loose};
    --spacing-extra-loose: ${SPACING['extra-loose']};
    /* Font */
    --font-body: ${FONT.body};
    --font-heading: ${FONT.heading};
    --font-monospace: ${FONT.monospace};
    /* Font Weight */
    --font-weight-light: ${FONT_WEIGHT.light};
    --font-weight-medium: ${FONT_WEIGHT.medium};
    --font-weight-heavy: ${FONT_WEIGHT.heavy};
    /* Font Size */
    --font-size-small: ${FONT_SIZE.small};
    --font-size-medium: ${FONT_SIZE.medium};
    --font-size-large: ${FONT_SIZE.large};
  }
  body {
    background: var(--color-background);
    color: var(--color-text);
    transition: background 0.2s ease, color 0.2s ease;

    font-family: var(--font-body);
  }

  .sr-only {
    position:absolute;
    left:-10000px;
    top:auto;
    width:1px;
    height:1px;
    overflow:hidden;
  }
`;

export default GlobalStyle;
