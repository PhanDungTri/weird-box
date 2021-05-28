import { centerizeStyle, slotStyle } from "../styles";
import Icon from "./Icon";

type EmptySlotProps = {
  scale?: number;
  className?: string;
};

const EmptySlot = ({ scale = 1, ...props }: EmptySlotProps): JSX.Element => {
  return (
    <div css={slotStyle(scale)} {...props}>
      <Icon name="sleep_bubble" scale={scale} css={centerizeStyle} />
    </div>
  );
};

export default EmptySlot;
