import { forwardRef } from 'react';
import styled from 'styled-components';
import InlineError from '../InlineError';
import Label from '../Label';

const StyledTextField = styled.div`
  font-family: var(--font-body);
  display: block;
  padding: var(--spacing-tight);
  background: var(--color-background);
  border-radius: var(--border-radius-medium);
  border: var(--border-medium) solid
    ${(p) => (p.error ? 'var(--color-error)' : 'var(--color-secondary)')};
  color: var(--color-text);
  width: ${(p) => (p.fullWidth ? '100%' : 'auto')};
  max-width: ${(p) => (p.fullWidth ? '100%' : 'auto')};
  min-width: ${(p) => (p.fullWidth ? '100%' : 'auto')};
`;

const FieldLabel = styled(Label)`
  margin-bottom: var(--spacing-tight);
`;

type TextFieldProps = {
  value?: string;
  onChange?: (e: any) => void;
  label: string;
  name: string;
  id: string;
  labelHidden?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  multiline?: boolean | number;
  error?: string;
};

const FieldError = styled(InlineError)`
  margin-top: 0.5em;
`;

function TextField(
  { labelHidden, label, multiline, error, id, ...props }: TextFieldProps,
  ref,
) {
  const labelId = `${id}-label`;
  return (
    <div>
      <FieldLabel id={labelId} htmlFor={id} hidden={labelHidden}>
        {label}
      </FieldLabel>
      <StyledTextField
        as={multiline ? 'textarea' : 'input'}
        rows={multiline || null}
        ref={ref}
        id={id}
        aria-labelledby={labelId}
        error={error}
        {...props}
      />
      {error && <FieldError message={error} />}
    </div>
  );
}

export default forwardRef(TextField);
