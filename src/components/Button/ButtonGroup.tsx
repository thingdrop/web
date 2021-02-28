import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  > :not(:first-child) {
    margin-left: var(--spacing-medium);
  }
`;

type ButtonGroupProps = {
  children: any;
};

export default function ButtonGroup({ children }: ButtonGroupProps) {
  return <Wrapper>{children}</Wrapper>;
}
