import { ReactElement } from 'react';
import styled from 'styled-components';

const TabsWrapper = styled.div``;

const TabList = styled.ul`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-background-secondary);
`;

const TabListItem = styled.li`
  flex-grow: 1;
  flex-basis: 0;
`;

const TabButton = styled.button`
  width: 100%;
  cursor: pointer;
  position: relative;
  background: ${(p) =>
    p.selected ? 'var(--color-background-secondary)' : 'transparent'};
  border-top-left-radius: var(--border-radius-large);
  border-top-right-radius: var(--border-radius-large);
  font-size: var(--font-size-small);
  color: ${(p) =>
    p.selected ? 'var(--color-text)' : 'var(--color-text-secondary)'};
  border: none;
  padding: var(--spacing-medium) var(--spacing-looser);

  :after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.3em;
    background: ${(p) => (p.selected ? 'var(--color-text)' : 'transparent')};
    /* transition: background var(--timing-fast), color var(--timing-fast); */
  }
  :hover {
    color: var(--color-text);
    /* background: var(--color-background-secondary); */
    :after {
      background: ${(p) =>
        p.selected ? 'var(--color-text)' : 'var(--color-background-secondary)'};
    }
  }
`;

const TabsContent = styled.div``;

type Tab = {
  id: string;
  content: any;
};

type TabsProps = {
  children: any;
  tabs: Tab[];
  selected: number;
  onSelect: (e: any) => void;
  style?: any;
};

export default function Tabs(props: TabsProps): ReactElement {
  const { children, tabs, onSelect, selected, ...delegated } = props;
  return (
    <TabsWrapper {...delegated}>
      <TabList role="tablist">
        {tabs.map(({ id, content }, index) => (
          <TabListItem key={id}>
            <TabButton
              onClick={() => onSelect(index)}
              selected={index === selected}
            >
              {content}
            </TabButton>
          </TabListItem>
        ))}
      </TabList>
      <TabsContent role="tabpanel">{children}</TabsContent>
    </TabsWrapper>
  );
}
