import { useEffect, useState } from 'react';
import styled from 'styled-components';
import VisuallyHidden from '../VisuallyHidden';

type ProgressBarProps = {
  progress: number;
};

const Container = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: 0.4rem;
  width: 100%;
`;

const Bar = styled.div`
  background: rgb(24, 204, 147);
  background: linear-gradient(
    90deg,
    rgba(24, 204, 147, 1) 0%,
    rgba(24, 204, 147, 0.6264880952380952) 52%,
    rgba(24, 204, 147, 0.4332107843137255) 100%
  );

  height: 20px;
  transition: 0.4s ease;
  transition-delay: 0.1s;
  border-radius: 0.4rem;
  margin: 0;
  width: ${(p) => p.$percent}%;
`;

export default function ProgressBar(props: ProgressBarProps) {
  const { progress } = props;
  const [shownProgress, setShownProgress] = useState(0);

  useEffect(() => {
    const boundProgress = progress > 100 ? 100 : progress;
    setShownProgress(boundProgress);
  }, [progress]);

  return (
    <Container>
      <VisuallyHidden>
        <progress value={progress} max={100}></progress>
      </VisuallyHidden>
      <Bar $percent={shownProgress}></Bar>
    </Container>
  );
}
