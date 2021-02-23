import { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import autosize from 'autosize';
import { mergeRefs } from '@/utils';
import InlineError from '../InlineError';
import Label from '../Label';
import { outline } from '@/constants';

const getRows = (multiline) => {
  if (!multiline) return null;
  if (typeof multiline === 'boolean') return 4;
  return multiline;
};

const StyledWrapper = styled.div`
  :focus-within {
    ${outline}
  }
  display: flex;
  position: relative;
  align-items: stretch;
  justify-content: space-between;
  border: var(--border-medium) solid
    ${(p) => (p.error ? 'var(--color-error)' : 'var(--color-secondary)')};
  border-radius: var(--border-radius-medium);
  background: var(--color-background);
  width: ${(p) => (p.fullWidth ? '100%' : 'auto')};
  max-width: ${(p) => (p.fullWidth ? '100%' : 'auto')};
  min-width: ${(p) => (p.fullWidth ? '100%' : 'auto')};
`;

const StyledTextField = styled.div`
  font-size: var(--font-size-smaller);
  outline: none;
  font-family: var(--font-body);
  display: block;
  flex-grow: 1;
  background: var(--color-background);
  border: none;
  padding: var(--spacing-tight);
  color: var(--color-text);
  resize: none;
  max-height: 60vh;
`;

const Prefix = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: text;
  color: var(--color-text-secondary);
  font-size: var(--font-size-smaller);
  padding: 0 var(--spacing-tightest) 0 var(--spacing-tight);
`;

const Suffix = styled(Prefix)`
  position: ${(p) => (p.multiline ? 'absolute' : null)};
  bottom: ${(p) => (p.multiline ? 'var(--spacing-tight)' : null)};
  right: 0;
  padding: 0 var(--spacing-tight) 0 var(--spacing-tightest);
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
  style?: any;
  type?: string;
  min?: number | string;
  max?: number | string;
  minLength?: number | string;
  maxLength?: number | string;
  disabled?: boolean;
  showCharacterCount?: boolean;
  prefix?: string;
  suffix?: string;
  defaultValue?: string | number;
};

const FieldError = styled(InlineError)`
  margin-top: 0.5em;
`;

const computeCharCount = (value: string, total: number | string) => {
  return total ? `${value.length}/${total}` : value.length;
};

function TextField(props: TextFieldProps, ref) {
  const {
    value,
    onChange,
    labelHidden,
    label,
    multiline,
    error,
    id,
    showCharacterCount,
    maxLength,
    prefix,
    suffix,
    defaultValue,
    ...delegated
  } = props;
  const [localValue, setLocalValue] = useState(value || defaultValue || '');
  const localRef = useRef(null);

  useEffect(() => {
    autosize(localRef.current);
  }, []);

  useEffect(() => {
    if (suffix && showCharacterCount) {
      console.warn(
        `<TexField name="${props.name}" />: The "showCharacterCount" prop overrides the "suffix" prop. Choose one or the other.`,
      );
    }
  }, [suffix, showCharacterCount, props.name]);

  const labelId = `${id}-label`;

  const focusInput = () => {
    localRef.current.focus();
  };

  const handleChange = (event) => {
    return onChange ? onChange(event) : setLocalValue(event.target.value);
  };

  const computedValue = onChange ? value : localValue;
  return (
    <>
      <FieldLabel id={labelId} htmlFor={id} hidden={labelHidden}>
        {label}
      </FieldLabel>
      <StyledWrapper error={error} onClick={focusInput}>
        {prefix && !multiline && (
          <Prefix multiline={multiline}>{prefix}</Prefix>
        )}
        <StyledTextField
          value={computedValue}
          onChange={handleChange}
          as={multiline ? 'textarea' : 'input'}
          rows={getRows(multiline)}
          ref={mergeRefs(ref, localRef)}
          id={id}
          aria-labelledby={labelId}
          error={error}
          maxLength={maxLength}
          {...delegated}
        />
        {suffix && !showCharacterCount && (
          <Suffix multiline={multiline}>
            <span>{suffix}</span>
          </Suffix>
        )}
        {typeof computedValue === 'string' && showCharacterCount && (
          <Suffix multiline={multiline}>
            <span>{computeCharCount(computedValue, maxLength)}</span>
          </Suffix>
        )}
      </StyledWrapper>
      {error && <FieldError message={error} />}
    </>
  );
}

export default forwardRef(TextField);
