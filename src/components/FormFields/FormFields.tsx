import styled from 'styled-components';
import FieldGroup from './FieldGroup';

const StyledField = styled.div`
  margin-bottom: var(--spacing-looser);
`;

function FormFields({ children }) {
  return children.map((child, index) => (
    <StyledField key={index}>{child}</StyledField>
  ));
}

FormFields.Group = FieldGroup;

export default FormFields;
