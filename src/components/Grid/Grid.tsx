import styled from 'styled-components';

const List = styled.ul`
  padding: 0 var(--spacing-loosest);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: repeat(8, 200px);
  grid-gap: 1rem;
  grid-auto-flow: dense;
`;

export default function Grid({ items, ...props }) {
  return (
    <List {...props}>
      {items && items.map((item) => <li key={item.id}>{item.title}</li>)}
    </List>
  );
}
