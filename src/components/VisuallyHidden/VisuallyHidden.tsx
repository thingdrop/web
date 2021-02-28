import { visuallyHidden } from '@/constants';
import styled from 'styled-components';

const Hidden = styled.div`
  ${visuallyHidden}
`;

type VisuallyHiddenProps = {
  children: any;
};

const VisuallyHidden = ({ children, ...props }: VisuallyHiddenProps) => (
  <Hidden {...props}>{children}</Hidden>
);

export default VisuallyHidden;
