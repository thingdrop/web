import styled from 'styled-components';

const StyledField = styled.div`
  margin-bottom: var(--spacing-looser);
`;

export default function FormFields({ children }) {
  return children.map((child, index) => (
    <StyledField key={index}>{child}</StyledField>
  ));
}
