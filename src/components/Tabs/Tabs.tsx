import { outline } from '@/constants';
import { ReactElement, useEffect, useRef } from 'react';
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
    p.$selected ? 'var(--color-background-secondary)' : 'transparent'};
  /* border-top-left-radius: var(--border-radius-large);
  border-top-right-radius: var(--border-radius-large); */
  font-size: var(--font-size-small);
  color: ${(p) =>
    p.$selected ? 'var(--color-text)' : 'var(--color-text-secondary)'};
  border: none;
  padding: var(--spacing-medium) var(--spacing-looser);

  outline: none;
  :focus-visible {
    ${outline}
  }

  :after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.3em;
    background: ${(p) =>
      p.$selected ? 'var(--color-primary)' : 'transparent'};
    /* transition: background var(--timing-fast), color var(--timing-fast); */
  }
  :hover {
    color: var(--color-text);
    :after {
      background: ${(p) =>
        p.$selected
          ? 'var(--color-primary)'
          : 'var(--color-background-secondary)'};
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

  const tabRef = useRef([]);

  /* Focus selected tab when selected prop changes */
  useEffect(() => {
    /* Only focus tab on prop change if one of the tabs is already selected */
    if (tabRef.current.includes(document.activeElement)) {
      tabRef.current[selected].focus();
    }
  }, [selected]);

  const handleKeyUp = (event: KeyboardEvent, index: number) => {
    const { code } = event;
    if (code === 'ArrowRight') {
      const newTabIndex = tabRef.current[index + 1] ? index + 1 : 0;
      onSelect(newTabIndex);
    }

    if (code === 'ArrowLeft') {
      const newTabIndex = tabRef.current[index - 1]
        ? index - 1
        : tabs.length - 1;
      onSelect(newTabIndex);
    }
  };

  return (
    <TabsWrapper {...delegated}>
      <TabList role="tablist">
        {tabs.map(({ id, content }, index) => (
          <TabListItem key={id}>
            <TabButton
              id={id}
              ref={(el) => (tabRef.current[index] = el)}
              onKeyUp={(e) => handleKeyUp(e, index)}
              onClick={() => onSelect(index)}
              tabIndex={index === selected ? 0 : -1}
              $selected={index === selected}
              aria-selected={index === selected}
              aria-controls={`${id}-tab`}
              role="tab"
            >
              {content}
            </TabButton>
          </TabListItem>
        ))}
      </TabList>
      <TabsContent
        role="tabpanel"
        id={`${tabs[selected].id}-tab`}
        aria-labelledby={tabs[selected].id}
      >
        {children}
      </TabsContent>
    </TabsWrapper>
  );
}
