import { visuallyHidden } from '@/constants';
import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { Check } from '@styled-icons/boxicons-regular';
import Label from '../Label';

const CheckIcon = styled(Check)`
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const HiddenCheckbox = styled.input`
  ${visuallyHidden}
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  border-radius: 3px;
  transition: box-shadow var(--timing-fast) ease,
    background var(--timing-faster) ease-out;
  margin-right: var(--spacing-medium);
  width: 16px;
  height: 16px;
  background: ${(props) =>
    props.checked ? 'var(--color-outline)' : 'var(--color-background)'};
  border: 1px solid var(--color-secondary);
  ${HiddenCheckbox}:focus + & {
    transition: box-shadow var(--timing-fast) ease,
      background var(--timing-faster) ease-out;
    box-shadow: 0 0 0 2px var(--color-outline);
  }

  ${CheckIcon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;

type CheckboxProps = {
  label: string;
  name: string;
  id?: string;
  checked?: boolean;
  onChange?: (e: any) => void;
  value?: any;
  children?: any;
  defaultChecked?: boolean;
};

const getCheckedState = (
  controlledChecked: boolean | null,
  localChecked: boolean,
) => {
  const isLocal = controlledChecked === undefined || controlledChecked === null;
  return isLocal ? localChecked : controlledChecked;
};

function Checkbox(props: CheckboxProps, ref) {
  const {
    label,
    id,
    children,
    checked,
    defaultChecked,
    onChange,
    ...delegated
  } = props;
  const [localChecked, setLocalChecked] = useState(defaultChecked || false);
  const labelId = `${id}-label`;

  const handleChange = (event) => {
    return onChange ? onChange(event) : setLocalChecked(!localChecked);
  };
  const isChecked = getCheckedState(checked, localChecked);
  return (
    <Label id={labelId} htmlFor={id}>
      <HiddenCheckbox
        checked={isChecked}
        onChange={handleChange}
        ref={ref}
        id={id}
        aria-labelledby={labelId}
        type="checkbox"
        {...delegated}
      />
      <StyledCheckbox checked={isChecked}>
        <CheckIcon />
      </StyledCheckbox>

      <span>{children || label}</span>
    </Label>
  );
}

export default forwardRef(Checkbox);
