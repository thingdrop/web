import { forwardRef } from "react";
import styled from "styled-components";
import Label from "../Label";

const StyledRadio = styled.input`
  margin-right: var(--spacing-medium);
`;

type RadioProps = {
  label: string;
  name: string;
  value: any;
};

const Radio = forwardRef(({ label, name, ...props }: RadioProps, ref) => {
  const id = label.toLowerCase();
  const radioId = `checkbox-${id}`;
  const labelId = `${radioId}-label`;
  return (
    <Label id={labelId} htmlFor={radioId}>
      <StyledRadio
        name={name}
        ref={ref}
        id={radioId}
        aria-labelledby={labelId}
        type="radio"
        {...props}
      />
      <span>{label}</span>
    </Label>
  );
});

export default Radio;
