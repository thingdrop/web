import styled from 'styled-components';

const StyledListItem = styled.li`
  margin-bottom: var(--spacing-tight);
  line-height: 1.6;
`;

type ListItemProps = {
  children: any;
};

export default function ListItem({ children }: ListItemProps) {
  return <StyledListItem>{children}</StyledListItem>;
}
