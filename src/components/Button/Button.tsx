import styled from 'styled-components';
import Spinner from '../Spinner';
import ButtonGroup from './ButtonGroup';

const StyledButton = styled.div`
  cursor: pointer;
  background: var(--color-primary);
  color: var(--color-text-inverted);
  border-radius: var(--border-radius-medium);
  padding: var(--spacing-tight) var(--spacing-medium);
  font-size: var(--font-size-smaller);
  font-family: var(--font-body);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  line-height: normal;
  border: 1px solid var(--color-primary);
`;

const ButtonContent = styled.span`
  position: relative;
`;

const ButtonChildren = styled.span`
  opacity: ${(p) => (p.$loading ? 0 : 1)};
`;

const LoadingIcon = styled(Spinner)`
  color: white;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
`;

type ButtonProps = {
  onClick?: (e: any) => void;
  children: any;
  href?: string;
  type?: string;
  disabled?: boolean;
  loading?: boolean;
};

function Button({
  children,
  href,
  type,
  loading,
  onClick,
  disabled,
  ...delegated
}: ButtonProps) {
  const element = href ? 'a' : 'button';

  const handleClick = (event) => {
    if (loading || disabled) return;
    if (onClick) return onClick(event);
  };

  return (
    <StyledButton
      type={type || 'button'}
      onClick={handleClick}
      as={element}
      href={href}
      disabled={disabled}
      {...delegated}
    >
      <ButtonContent>
        {loading && <LoadingIcon size={16} />}
        <ButtonChildren $loading={loading}>{children}</ButtonChildren>
      </ButtonContent>
    </StyledButton>
  );
}

Button.Group = ButtonGroup;

export default Button;
