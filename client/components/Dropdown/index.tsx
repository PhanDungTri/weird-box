import { ReactNode, useState } from "react";
import { animated } from "react-spring";
import { useOnClickOutside, useRevealAnimation } from "../../hooks";
import Button from "../Button";
import Icon from "../Icon";
import { dropDownContentStyle, dropDownIconStyle } from "./styles";

type DropDownProps = {
  header?: ReactNode;
  children: ReactNode;
  onTop?: boolean;
};

const DropDown = ({ header, children, onTop = false }: DropDownProps): JSX.Element => {
  const [shouldShow, show] = useState(false);
  const ref = useOnClickOutside<HTMLDivElement>(() => show(false));
  const transitions = useRevealAnimation(shouldShow);

  const toggleShow = () => show(!shouldShow);

  return (
    <div css={{ position: "relative" }}>
      <div ref={ref} onClick={toggleShow}>
        {!header || typeof header === "string" ? (
          <Button>
            <span>{header}</span>
            <Icon name="triangle" scale={1 / 3} css={dropDownIconStyle} />
          </Button>
        ) : (
          header
        )}
      </div>
      {transitions.map(
        ({ item, props }) =>
          item && (
            <animated.div style={props} css={dropDownContentStyle(onTop)}>
              {children}
            </animated.div>
          )
      )}
    </div>
  );
};

export default DropDown;
