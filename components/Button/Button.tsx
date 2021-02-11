import styled from 'styled-components';

const StyledButton = styled.div`
  cursor: pointer;
  background: var(--color-primary);
  color: var(--color-text-inverted);
  border-radius: 3px;
  padding: var(--spacing-tight) var(--spacing-medium);
  font-size: var(--font-size-small);
  font-family: var(--font-body);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  line-height: normal;
  border: none;
`;

export default function Button({ children, href, ...rest }) {
  const element = href ? 'a' : 'button';
  return (
    <StyledButton as={element} href={href} {...rest}>{children}</StyledButton>
  )
}
