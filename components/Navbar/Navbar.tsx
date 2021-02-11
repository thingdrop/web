import styled from 'styled-components';
import { Input, Form, Button, ThemeToggle, Link } from '../../components';
const Header = styled.header`
  display: grid;
  grid-template-columns:
    1fr
    min(80ch, calc(100% - 64px))
    1fr;
  grid-column-gap: 32px;
  padding: var(--spacing-medium);
  background: var(--color-background-secondary);
  align-items: center;
`;

const Logo = styled.a`
  justify-self: end;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Navbar() {
  return (
    <Header>
      <Link href="/" style={{ justifySelf: 'end' }}>
        Thingdrop
      </Link>

      <Nav>
        <Form onSubmit={() => { console.log('hi')}}>
          <Input
            label="Search"
            labelHidden
            placeholder="Search for 3D models"
            style={{ minWidth: '40ch' }}
          />
        </Form>
        <Link href="/">
          Discover
        </Link>
        <Link href="/">
          Trending
        </Link>
        <Link href="/">
          Events
        </Link>
        <Link href="/upload">
          <Button>Upload</Button>
        </Link>
      </Nav>
      <div>
        <ThemeToggle />
      </div>
    </Header>
  );
}
