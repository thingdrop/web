import styled from "styled-components";

const StyledButton = styled.div`
  cursor: pointer;
  background: var(--color-primary);
  color: var(--color-text-inverted);
  border-radius: var(--border-radius-medium);
  padding: var(--spacing-tight) var(--spacing-medium);
  font-size: var(--font-size-smaller);
  font-family: var(--font-body);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  line-height: normal;
  border: none;
`;

type ButtonProps = {
  onClick?: () => {};
  children: any;
  href?: string;
  type?: string;
};

export default function Button({ children, href, type, ...rest }: ButtonProps) {
  const element = href ? "a" : "button";
  return (
    <StyledButton type={type || "button"} as={element} href={href} {...rest}>
      {children}
    </StyledButton>
  );
}
