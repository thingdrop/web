import { mergeRefs } from '@/utils';
import { forwardRef, useRef, useState } from 'react';
import styled from 'styled-components';
import InlineError from '../InlineError';
import Label from '../Label';
import { KeyboardArrowDown } from '@styled-icons/material-twotone';

const DropdownIcon = styled(KeyboardArrowDown)`
  color: var(--color-text-secondary);
`;
const StyledWrapper = styled.div`
  :focus-within {
    outline-color: rgb(77, 144, 254); // #4D90FE
    outline-offset: 0px;
    outline-style: auto;
    outline-width: 5px;
  }
  padding: var(--spacing-tight);
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border: var(--border-medium) solid
    ${(p) => (p.error ? 'var(--color-error)' : 'var(--color-secondary)')};
  border-radius: var(--border-radius-medium);
  background: var(--color-background);
`;

const StyledSelect = styled.select`
  /* z-index: 30; */
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  appearance: none;
  outline: none;
  font-family: var(--font-body);
  display: block;
  flex-grow: 1;
  background: var(--color-background);
  border: none;
  padding: var(--spacing-tight);
  color: var(--color-text);
`;

const Presentational = styled.div`
  /* z-index: 20; */
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
`;

const FieldLabel = styled(Label)`
  margin-bottom: var(--spacing-tight);
`;

const FieldError = styled(InlineError)`
  margin-top: 0.5em;
`;

const CenteredElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const PseudoSelect = styled(CenteredElement)`
  min-height: 1em;
  width: 100%;
  text-align: left;
  justify-content: space-between;
  font-size: var(--font-size-small);
`;

const Prefix = styled(CenteredElement)`
  color: var(--color-text-secondary);
  font-size: var(--font-size-smaller);
  padding: 0 var(--spacing-tightest) 0 var(--spacing-tight);
`;

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  value?: string;
  options: SelectOption[];
  onChange?: (e: any) => void;
  label: string;
  name: string;
  id: string;
  disabled?: boolean;
  labelHidden?: boolean;
  error?: string;
  prefix?: string;
  defaultValue?: string;
};

function Select(props: SelectProps, ref) {
  const {
    options,
    id,
    label,
    labelHidden,
    disabled,
    error,
    prefix,
    onChange,
    value,
    defaultValue,
  } = props;

  const [localValue, setLocalValue] = useState(defaultValue);
  const localRef = useRef(null);

  const labelId = `${id}-label`;

  const handleChange = (event) => {
    return onChange ? onChange(event) : setLocalValue(event.target.value);
  };

  const handleClick = () => {
    localRef.current.click();
  };
  const computedOption = options.find((option) => {
    const valueToFind = onChange ? value : localValue;
    return option.value === valueToFind;
  });
  const computedLabel = computedOption?.label;

  return (
    <>
      <FieldLabel id={labelId} htmlFor={id} hidden={labelHidden}>
        {label}
      </FieldLabel>

      <StyledWrapper error={error} onClick={handleClick}>
        <StyledSelect
          ref={mergeRefs(ref, localRef)}
          disabled={disabled}
          {...props}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
        >
          <option value="" hidden></option>
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </StyledSelect>
        <Presentational>
          {prefix && (
            <Prefix>
              <span>{prefix}</span>
            </Prefix>
          )}
          <PseudoSelect>
            <span>{computedLabel}</span>
          </PseudoSelect>
          <DropdownIcon size={16} />
        </Presentational>
      </StyledWrapper>

      {error && <FieldError message={error} />}
    </>
  );
}

export default forwardRef(Select);
