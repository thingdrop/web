import { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '@/theme';
import { Moon } from '@styled-icons/boxicons-solid';
import { Sun } from '@styled-icons/open-iconic';

const IconButton = styled.button`
  cursor: pointer;
  width: auto;
  color: var(--color-text);
  border: none;
  background: none;
  padding: var(--spacing-tighter);
`;

export default function ThemeToggle() {
  const { colorMode, setColorMode } = useContext(ThemeContext);

  if (!colorMode) {
    return null;
  }

  const Icon = colorMode === 'light' ? Moon : Sun;
  const label = `Active ${colorMode === 'light' ? 'dark' : 'light'} mode`;
  return (
    <IconButton
      onClick={() => {
        setColorMode(colorMode === 'light' ? 'dark' : 'light');
      }}
      aria-label={label}
      title={label}
    >
      <Icon size={24} />
    </IconButton>
  );

  // return (
  //   <label>
  //     <input
  //       type="checkbox"
  //       checked={colorMode === 'dark'}
  //       onChange={(ev) => {
  //         setColorMode(ev.target.checked ? 'dark' : 'light');
  //       }}
  //     />{' '}
  //     Dark
  //   </label>
  // );
}
