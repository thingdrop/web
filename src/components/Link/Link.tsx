import NextLink from 'next/link';
import styled from 'styled-components';

const Anchor = styled.a`
  text-decoration: none;
  color: var(--color-link);
  font-weight: var(--font-weight-medium);
  :hover {
    color: var(--color-primary);
  }
`;

type LinkProps = {
  children?: any;
  href: string;
  native?: boolean;
};

export default function Link({ children, href, native, ...props }: LinkProps) {
  if (native) {
    return (
      <Anchor href={href} {...props}>
        {children}
      </Anchor>
    );
  }
  return (
    <NextLink href={href} passHref>
      <Anchor {...props}>{children}</Anchor>
    </NextLink>
  );
}
