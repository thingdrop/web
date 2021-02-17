import { forwardRef } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  color: var(--color-text);
  font-size: var(--font-size-small);
`;

type LabelProps = {
  id: string | number;
  htmlFor: string | number;
  children: any;
  hidden?: boolean;
  tabIndex?: number;
  className?: string;
  style?: any;
};

function Label({ children, hidden, className, ...props }: LabelProps, ref) {
  return (
    <StyledLabel
      {...props}
      className={[className, hidden && 'sr-only']}
      ref={ref}
    >
      {children}
    </StyledLabel>
  );
}

export default forwardRef(Label);
