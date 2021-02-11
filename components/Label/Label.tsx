import styled from 'styled-components';

const StyledLabel = styled.label`
  display: block;
  color: var(--color-text);
  font-size: var(--font-size-small);
`;

export default function Label({ children, hidden, ...props }) {
  return (
    <StyledLabel {...props} className={hidden && 'sr-only'}>{children}</StyledLabel>
  );
}
