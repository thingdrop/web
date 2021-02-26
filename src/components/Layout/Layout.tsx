import styled from 'styled-components';
import Navbar from '../Navbar';

const Footer = styled.footer`
  background: var(--color-background-secondary);
  padding: var(--spacing-loosest);
  grid-row-start: 2;
  grid-row-end: 3;
`;

const Wrapper = styled.div`
  display: grid;
  min-height: 100%;
  grid-template-rows: 1fr auto;
  grid-template-columns:
    1fr
    min(100ch, calc(100% - 64px))
    1fr;
  grid-column-gap: 32px;
  > * {
    grid-column: 2;
  }

  margin-top: var(--spacing-loosest);

  .full-bleed {
    width: 100%;
    grid-column: 1 / -1;
  }
`;

type LayoutProps = {
  children: any;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar></Navbar>
      <Wrapper>
        {children}
        <Footer className="full-bleed">&copy; 2020 - Present</Footer>
      </Wrapper>
    </>
  );
}
