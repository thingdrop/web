import styled from 'styled-components';

const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;

  & .path {
    stroke: var(--color-primary);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

type SpinnerProps = {
  className?: any;
  style?: any;
  size?: number;
};

const Spinner = (props: SpinnerProps) => (
  <StyledSpinner {...props} viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="5"
    />
  </StyledSpinner>
);

export default Spinner;
