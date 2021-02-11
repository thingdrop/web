import styled from 'styled-components';
import Label from '../Label';

const StyledInput = styled.input`
  display: block;
  padding: var(--spacing-tight);
  background: var(--color-background);
  border-radius: 3px;
  border: 1px solid var(--color-link);
  color: var(--color-text);
`;

export default function Input({ children, ...props }) {
  const { labelHidden, label } = props;

  const id = label.toLowerCase();
  const inputId = `input-${id}`;
  const labelId = `${inputId}-label`;
  return (
    <div>
      <Label id={labelId} htmlFor={inputId} hidden={labelHidden}>
        {label}
      </Label>
      <StyledInput
        id={inputId}
        aria-labelledby={labelId}
        {...props}
      >
        {children}
      </StyledInput>
    </div>
  );
}
