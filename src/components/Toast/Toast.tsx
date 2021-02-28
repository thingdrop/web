import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useToast } from './ToastProvider';
import { animated } from 'react-spring';
import { Times } from '@styled-icons/typicons';

const RemoveIcon = styled(Times)`
  color: var(--color-text);
`;

const IconButton = styled.button`
  cursor: pointer;
  width: auto;
  border: none;
  background: none;
  padding: 0;
  align-self: flex-start;
`;

const Message = styled.div`
  padding: var(--spacing-tight);
`;

const Wrapper = styled(animated.div)`
  margin-right: 16px;
  margin-top: 16px;
  min-width: 200px;
  max-width: 300px;

  position: relative;
  padding: var(--spacing-tight);
  border: 1px solid var(--color-background-secondary);
  border-radius: 3px;
  background: var(--color-background);
  box-shadow: 0px 6px 10px 0px var(--color-background);

  display: flex;
  align-items: stretch;
  justify-content: space-between;
`;

type ToastProps = {
  children: any;
  id: number;
  style: any;
  duration?: number;
};

const Toast = ({ children, id, style, duration }: ToastProps) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = duration
      ? setTimeout(() => {
          removeToast(id);
        }, duration)
      : null;

    return () => (duration ? clearTimeout(timer) : null);
  }, [id, removeToast, duration]);

  return (
    <Wrapper style={style}>
      <Message>{children}</Message>
      <IconButton onClick={() => removeToast(id)}>
        <RemoveIcon size={24} />
      </IconButton>
    </Wrapper>
  );
};

export default Toast;
