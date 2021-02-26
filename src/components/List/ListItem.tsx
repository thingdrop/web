import styled from 'styled-components';

const StyledListItem = styled.li`
  margin-bottom: var(--spacing-tight);
  line-height: 1.6;
`;

export default function ListItem({ children }) {
  return <StyledListItem>{children}</StyledListItem>;
}
