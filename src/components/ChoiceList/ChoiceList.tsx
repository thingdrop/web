import { forwardRef } from 'react';
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
  multiple?: boolean;
};

const Option = styled.div`
  margin: var(--spacing-tighter) 0;
  padding: var(--spacing-tighter) 0;
`;

const Legend = styled.legend`
  margin-bottom: var(--spacing-tight);
`;

function ChoiceList(props: ChoiceListProps, ref) {
  const { name, label, options, multiple } = props;
  const Input = multiple ? Checkbox : Radio;
  return (
    <fieldset>
      <Legend>{label}</Legend>
      {options.map((option) => (
        <Option key={option.value}>
          <Input
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
