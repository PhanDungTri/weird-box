import React from "react";
import "./Button.scss";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick }: ButtonProps): JSX.Element => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
