import styled from 'styled-components';

const Hidden = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

type VisuallyHiddenProps = {
  children: any;
};

const VisuallyHidden = ({ children, ...props }: VisuallyHiddenProps) => (
  <Hidden {...props}>{children}</Hidden>
);

export default VisuallyHidden;
