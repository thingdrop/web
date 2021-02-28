import styled from 'styled-components';

const InlineWrapper = styled.div`
  display: grid;
  grid-template-columns:
    1fr
    1fr;
  grid-column-gap: var(--spacing-loosest);
`;

type FieldGroupProps = {
  children: any;
  label: string;
  inline?: boolean;
};

const StyledField = styled.div`
  margin-bottom: ${(p) => (p.inline ? 0 : 'var(--spacing-looser)')};
  :last-child {
    margin-bottom: 0;
  }
`;

const Legend = styled.legend`
  margin-bottom: var(--spacing-loose);
  font-size: var(--font-size-medium);
  font-weight: var(--font-weight-medium);
  font-family: var(--font-heading);
`;

export default function FieldGroup(props: FieldGroupProps) {
  const { children, label, inline } = props;
  const FieldWrapper = inline ? InlineWrapper : 'div';
  return (
    <fieldset>
      <Legend>{label}</Legend>
      <FieldWrapper>
        {children.map((child, idx) => (
          <StyledField key={idx} inline={inline}>
            {child}
          </StyledField>
        ))}
      </FieldWrapper>
    </fieldset>
  );
}
