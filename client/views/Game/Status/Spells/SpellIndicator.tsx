import { memo, useEffect, useRef, useState } from "react";
import { SpellInfo } from "../../../../../shared/@types";
import Icon from "../../../../components/Icon";
import { SpellIndicatorBadge, spellTriggerAnimation } from "./styles";

const SpellIndicator = ({ duration, name, power }: SpellInfo): JSX.Element => {
  const [shouldTrigger, trigger] = useState(false);
  const firstRender = useRef(true);

  const stopTransition = () => trigger(false);

  useEffect(() => {
    if (firstRender.current) firstRender.current = false;
    else trigger(true);
  }, [duration, power]);

  return (
    <div css={{ position: "relative" }}>
      <Icon name={name} onTransitionEnd={stopTransition} css={spellTriggerAnimation(shouldTrigger)} />
      <SpellIndicatorBadge>{power}</SpellIndicatorBadge>
    </div>
  );
};

export default memo(SpellIndicator);
