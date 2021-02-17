import styled from 'styled-components';
import { ErrorCircle } from '@styled-icons/boxicons-solid';

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-size-smaller);
`;

const StyledSpan = styled.span`
  color: var(--color-error);
  margin-left: 0.5em;
`;

const ErrorIcon = styled(ErrorCircle)`
  color: var(--color-error);
`;

type InlineErrorProps = {
  message: string;
  className?: string;
};

export default function InlineError(props: InlineErrorProps) {
  const { message, className } = props;
  return (
    <ErrorWrapper className={className}>
      <ErrorIcon size={16} />
      <StyledSpan>{message}</StyledSpan>
    </ErrorWrapper>
  );
}
