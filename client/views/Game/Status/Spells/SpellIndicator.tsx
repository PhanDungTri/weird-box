import { memo, useEffect, useRef, useState } from "react";
import { SpellInfo } from "../../../../../shared/@types";
import Icon from "../../../../components/Icon";
import { SpellIndicatorBadge, spellTriggerAnimation } from "./styles";

type SpellIndicatorType = {
  className?: string;
} & Partial<SpellInfo>;

const SpellIndicator = ({ duration, name, strength, className }: SpellIndicatorType): JSX.Element => {
  const [shouldTrigger, trigger] = useState(false);
  const firstRender = useRef(true);

  const stopTransition = () => trigger(false);

  useEffect(() => {
    if (firstRender.current) firstRender.current = false;
    else trigger(true);
  }, [duration, strength]);

  return (
    <div css={{ position: "relative" }} className={className}>
      <Icon name={name || "info"} onTransitionEnd={stopTransition} css={spellTriggerAnimation(shouldTrigger)} />
      <SpellIndicatorBadge>{strength}</SpellIndicatorBadge>
    </div>
  );
};

export default memo(SpellIndicator);
