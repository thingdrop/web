import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { TextField, Form, Button, ThemeToggle, Link } from '@/components';

const Header = styled.header`
  display: grid;
  grid-template-columns:
    1fr
    min(100ch, calc(100% - 64px))
    1fr;
  grid-column-gap: 32px;
  padding: var(--spacing-tight);
  background: var(--color-background-secondary);
  align-items: center;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Navbar() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/results?search=${search}`);
  };

  return (
    <Header>
      <Link href="/" style={{ justifySelf: 'end' }}>
        <img height="38" src="/thingdrop-logo.svg" alt="Thingdrop Logo" />
      </Link>

      <Nav>
        <Form onSubmit={handleSubmit}>
          <TextField
            name="search"
            id="search"
            value={search}
            onChange={handleChange}
            label="Search"
            labelHidden
            placeholder="Search for 3D models"
            style={{ minWidth: '40ch' }}
          />
        </Form>
        <Link href="/">Discover</Link>
        <Link href="/">Trending</Link>
        <Link href="/">Events</Link>
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
