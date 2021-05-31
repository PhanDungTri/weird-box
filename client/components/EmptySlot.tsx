import { centerizeStyle, slotStyle } from "../styles";
import Icon from "./Icon";

type EmptySlotProps = {
  scale?: number;
  className?: string;
};

const EmptySlot = ({ scale = 1, className }: EmptySlotProps): JSX.Element => {
  return (
    <div css={slotStyle(scale)} className={className}>
      <Icon name="sleep_bubble" scale={scale} css={centerizeStyle} />
    </div>
  );
};

export default EmptySlot;
