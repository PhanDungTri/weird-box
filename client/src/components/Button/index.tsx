import React from "react";
import { isDarkColor } from "../../utils/color";
import "./Button.scss";

type ButtonProps = {
  colors?: [string, string];
  children?: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ children, onClick, colors = ["#000000", "#ffffff"] }: ButtonProps): JSX.Element => {
  return (
    <button
      className="button"
      onClick={onClick}
      style={
        {
          backgroundColor: colors[1],
          color: isDarkColor(colors[1]) ? "#fff" : "#000",
          "--border-color": colors[0],
        } as React.CSSProperties
      }
    >
      {children}
    </button>
  );
};

export default Button;
