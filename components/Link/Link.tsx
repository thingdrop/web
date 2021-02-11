import NextLink from 'next/link';
import styled from 'styled-components';

const Anchor = styled.a`
  text-decoration: none;
  color: var(--color-link);
  font-weight: var(--font-weight-medium);
  :hover {
    color: var(--color-primary)
  }
`;

export default function Link({ children, href, ...props }) {
  return (
    <NextLink href={href} passHref>
      <Anchor {...props}>
        {children}
      </Anchor>
    </NextLink>
  )
}
