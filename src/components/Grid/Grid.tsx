import styled from 'styled-components';

const List = styled.ul`
  padding: 0 var(--spacing-loosest);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: repeat(8, 250px);
  grid-gap: 1rem;
  grid-auto-flow: dense;
`;

type GridProps = {
  items: any[];
  children: any[];
};

export default function Grid({ children, ...props }: GridProps) {
  return (
    <List {...props}>
      {children &&
        children.map((item) => {
          const { children } = item.props;
          return <li key={item.key}>{children}</li>;
        })}
    </List>
  );
}
