import { forwardRef } from 'react';
import styled from 'styled-components';
import { visuallyHidden } from '@/constants';
import Label from '../Label';

const HiddenRadio = styled.input`
  ${visuallyHidden}
  outline: none;
`;
const StyledRadio = styled.div`
  margin-right: var(--spacing-medium);

  width: 16px;
  height: 16px;
  position: relative;
  background: ${(p) =>
    p.checked ? 'var(--color-outline)' : 'var(--color-background)'};
  border: 1px solid
    ${(p) => (p.checked ? 'var(--color-background)' : 'var(--color-secondary)')};
  border-radius: 50%;

  ${HiddenRadio}:focus + & {
    transition: box-shadow var(--timing-fast) ease,
      background var(--timing-faster) ease-out;
    border: ${(p) =>
      p.checked
        ? '2px solid var(--color-background)'
        : '1px solid var(--color-outline)'};
    box-shadow: 0 0 0 2px var(--color-outline);
  }
`;

type RadioProps = {
  label: string;
  name: string;
  value: any;
  checked?: boolean;
  onChange?: (e: any) => void;
  defaultChecked?: boolean;
};

function Radio(props: RadioProps, ref) {
  const { label, checked, name, defaultChecked, ...delegated } = props;
  const id = label.toLowerCase();
  const radioId = `checkbox-${id}`;
  const labelId = `${radioId}-label`;

  return (
    <Label id={labelId} htmlFor={radioId} style={{ position: 'relative' }}>
      <HiddenRadio
        checked={checked}
        defaultChecked={defaultChecked}
        name={name}
        ref={ref}
        id={radioId}
        aria-labelledby={labelId}
        type="radio"
        {...delegated}
      />
      <StyledRadio checked={checked}></StyledRadio>
      <span>{label}</span>
    </Label>
  );
}

export default forwardRef(Radio);
