import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useTransition } from 'react-spring';
import { useHasMounted } from '@/hooks';
import Toast from './Toast';

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`;

const ToastContainer = ({ toasts }) => {
  const hasMounted = useHasMounted();
  const transitions = useTransition(toasts, (toast) => toast.id, {
    config: {
      duration: 200,
      tension: 170,
      mass: 10,
      friction: 1,
    },
    from: { transform: 'translate(0, -100%)', maxHeight: '0px', opacity: 0 },
    enter: { transform: 'translate(0, 0)', maxHeight: '400px', opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    hasMounted &&
    createPortal(
      <Wrapper>
        {transitions.map(({ item, key, props }) => (
          <Toast key={key} id={item.id} style={props} duration={item.duration}>
            {item.content}
          </Toast>
        ))}
      </Wrapper>,
      document.body,
    )
  );
};

export default ToastContainer;
