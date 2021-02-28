import styled from 'styled-components';

const StyledWrapper = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-large);
  padding: var(--spacing-loose);
  border: var(--border-thin) solid var(--color-secondary);
`;

type CardProps = {
  children: any;
  style?: any;
};

export default function Card({ children, ...delegated }: CardProps) {
  return <StyledWrapper {...delegated}>{children}</StyledWrapper>;
}
