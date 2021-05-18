import { ReactNode, useState } from "react";
import { animated } from "react-spring";
import DropDownSprite from "../../assets/sprites/dropdown.png";
import COLOR from "../../constants/COLOR";
import { useOnClickOutside, useRevealAnimation } from "../../hooks";
import Button from "../Button";
import Sprite from "../Sprite";
import { dropDownContentStyle, dropDownIconStyle } from "./styles";

type DropDownProps = {
  header?: ReactNode;
  children: ReactNode;
  top?: boolean;
  background?: string;
};

const DropDown = ({ header, children, top = false, background = COLOR.White }: DropDownProps): JSX.Element => {
  const [shouldShow, show] = useState(false);
  const ref = useOnClickOutside<HTMLDivElement>(() => show(false));
  const transitions = useRevealAnimation(shouldShow);

  const toggleShow = () => show(!shouldShow);

  return (
    <div style={{ position: "relative" }}>
      <div ref={ref} onClick={toggleShow}>
        {!header || typeof header === "string" ? (
          <Button>
            <span>{header}</span>
            <Sprite css={dropDownIconStyle} src={DropDownSprite} size={[9, 6]} />
          </Button>
        ) : (
          header
        )}
      </div>
      {transitions.map(
        ({ item, props }) =>
          item && (
            <animated.div style={props} css={dropDownContentStyle(top, background)}>
              {children}
            </animated.div>
          )
      )}
    </div>
  );
};

export default DropDown;
