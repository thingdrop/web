import styled from 'styled-components';
import Link from '../Link';

const StyledList = styled.ol`
  list-style: none;
  counter-reset: muffins;
`;

const StyledListItem = styled.li`
  counter-increment: muffins;
  position: relative;
  display: flex;
  align-items: center;

  padding: var(--spacing-tight) var(--spacing-tight) var(--spacing-tight) 0;
  border-radius: var(--border-radius-medium);

  /* Text */
  a {
    margin-left: 1em;
  }
  /* Circle */
  :before {
    content: counter(muffins) '';
    font-size: var(--font-size-smaller);
    font-weight: var(--font-weight-medium);
    line-height: 30px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    /* border: 1px solid var(--color-background-secondary); */
    text-align: center;
    background-color: var(--color-background-secondary);
  }
  :not(:last-child) {
    margin-bottom: var(--spacing-medium);
  }
  /* Active */
  &.active {
    background: var(--color-background-secondary);
    color: var(--color-background);
    :before {
      color: var(--color-background);
      background-color: var(--color-text);
    }
  }
`;

type Step = {
  label: string;
  id: string;
};

type StepsProps = {
  steps: Step[];
};

export default function Steps(props: StepsProps) {
  const { steps } = props;
  return (
    <StyledList>
      {steps.map(({ label, id }) => (
        <StyledListItem key={id}>
          <Link href={`#${id}`} native>
            {label}
          </Link>
        </StyledListItem>
      ))}
    </StyledList>
  );
}
