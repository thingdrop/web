import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  > :not(:first-child) {
    margin-left: var(--spacing-medium);
  }
`;

export default function ButtonGroup({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
