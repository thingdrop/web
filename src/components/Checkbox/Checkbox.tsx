import { forwardRef } from 'react';
import styled from 'styled-components';
import Label from '../Label';

const StyledCheckbox = styled.input`
  margin-right: var(--spacing-medium);
`;

type CheckboxProps = {
  label: string;
  name: string;
  id?: string;
  value?: any;
};

function Checkbox({ label, id, ...props }: CheckboxProps, ref) {
  const labelId = `${id}-label`;
  return (
    <Label id={labelId} htmlFor={id}>
      <StyledCheckbox
        ref={ref}
        id={id}
        aria-labelledby={labelId}
        type="checkbox"
        {...props}
      />
      <span>{label}</span>
    </Label>
  );
}

export default forwardRef(Checkbox);
