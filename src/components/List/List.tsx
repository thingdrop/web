import styled from 'styled-components';
import ListItem from './ListItem';

const StyledList = styled.div`
  list-style-type: disc;
  padding-inline-start: 20px;
`;

type ListProps = {
  children: any;
  type?: string;
};

function List(props: ListProps) {
  const { children, type } = props;
  return (
    <StyledList as={type === 'number' ? 'ol' : 'ul'}>{children}</StyledList>
  );
}

List.Item = ListItem;

export default List;
