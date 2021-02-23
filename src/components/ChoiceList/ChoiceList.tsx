import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import Checkbox from '../Checkbox';
import Radio from '../Radio';

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

type ChoiceListProps = {
  name: string;
  label: string;
  options: Option[];
  selected?: string[];
  onChange?: (e: any) => void;
  multiple?: boolean;
  defaultChecked?: string[];
};

const Option = styled.div`
  margin: var(--spacing-tighter) 0;
  padding: var(--spacing-tighter) 0;
`;

const Legend = styled.legend`
  margin-bottom: var(--spacing-tight);
`;

const getCheckedState = (
  controlledSelected: string[],
  localSelected: string[],
  option: string,
) => {
  const isLocal =
    controlledSelected === undefined || controlledSelected === null;
  return isLocal
    ? localSelected.includes(option)
    : controlledSelected.includes(option);
};

function ChoiceList(props: ChoiceListProps, ref) {
  const {
    name,
    label,
    options,
    multiple,
    selected,
    onChange,
    defaultChecked,
  } = props;
  const [localSelected, setLocalSelected] = useState(defaultChecked || []);
  const Input = multiple ? Checkbox : Radio;

  const handleChange = (event) => {
    if (onChange) return onChange(event);
    const { value } = event.target;
    if (multiple) {
      if (localSelected.includes(value)) {
        const newSelected = localSelected.filter((s) => s !== value);
        setLocalSelected(newSelected);
      } else {
        setLocalSelected(() => [...localSelected, value]);
      }
    } else {
      if (localSelected.includes(value)) {
        setLocalSelected([]);
      } else {
        setLocalSelected([value]);
      }
    }
  };
  return (
    <fieldset>
      <Legend>{label}</Legend>
      {options.map((option) => (
        <Option key={option.value}>
          <Input
            checked={getCheckedState(selected, localSelected, option.value)}
            defaultChecked={defaultChecked?.includes(option.value)}
            onChange={handleChange}
            label={option.label}
            name={name}
            value={option.value}
            ref={ref}
          />
        </Option>
      ))}
    </fieldset>
  );
}

export default forwardRef(ChoiceList);
