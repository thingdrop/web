import { forwardRef } from 'react';
import styled from 'styled-components';

const headingSizeMap = {
  h1: 'largest',
  h2: 'larger',
  h3: 'large',
  h4: 'medium',
  h5: 'small',
  h6: 'small',
};

const getFontVariable = ({ as }) => `var(--font-size-${headingSizeMap[as]})`;

const StyledHeading = styled.div`
  font-size: ${getFontVariable};
  margin-bottom: 0.5em;
  font-family: var(--font-heading);
  font-weight: 600;
`;

type HeadingProps = {
  children?: any;
  level: number | string;
  id?: string | number;
};

function Heading({ children, ...props }: HeadingProps, ref) {
  const { level } = props;
  const headingTag = `h${level}`;
  return (
    <StyledHeading as={headingTag} ref={ref} {...props}>
      {children}
    </StyledHeading>
  );
}

export default forwardRef(Heading);
