import React from 'react';
import style from './index.module.scss';

export type ButtonSize = 'large' | 'middle' | 'small';

export interface ButtonProps {
  icon: React.ElementType;
  color: string;
  title: string;
  size?: ButtonSize;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  icon: Icon,
  color,
  title,
  size = 'large',
  onClick,
}) => {
  const sizeClass = style[`size-${size}`];
  const buttonStyle: React.CSSProperties & Record<string, string> = {
    '--button-color': color,
    '--button-active-bg': `${color}80`,
  };

  return (
    <div
      className={`${style.button} ${sizeClass}`}
      style={buttonStyle}
      onClick={onClick}
    >
      <Icon size="inherit" />
      <span className={style.title}>{title}</span>
    </div>
  );
};

export default Button;
