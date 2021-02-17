import { Heading, Link } from '@/components';
import styled from 'styled-components';

const CenteredMain = styled.main`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  text-align: center;
`;
export default function FourOhFour() {
  return (
    <CenteredMain>
      <div>
        <Heading level={1}>404 | We couldn't find that page</Heading>
        Who sent you here? <Link href="/">Go home</Link>
      </div>
    </CenteredMain>
  );
}
