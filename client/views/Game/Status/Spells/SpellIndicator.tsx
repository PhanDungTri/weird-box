import { memo, useEffect, useRef, useState } from "react";
import { SpellInfo } from "../../../../../shared/@types";
import Icon from "../../../../components/Icon";
import { spellIndicatorBadge, spellTriggerAnimation } from "./styles";

const SpellIndicator = ({ duration, name, power }: SpellInfo): JSX.Element => {
  const [shouldTrigger, trigger] = useState(false);
  const firstRender = useRef(true);

  const stopTransition = () => trigger(false);

  useEffect(() => {
    if (firstRender.current) firstRender.current = false;
    else trigger(true);
  }, [duration, power]);

  return (
    <div style={{ position: "relative" }}>
      <Icon name={name} onTransitionEnd={stopTransition} css={spellTriggerAnimation(shouldTrigger)} />
      <div css={spellIndicatorBadge}>{power}</div>
    </div>
  );
};

export default memo(SpellIndicator);
