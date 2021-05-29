import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { SERVER_EVENT_NAME } from "../../../../../shared/constants";
import { soundAtom } from "../../../../atoms";
import Sprite from "../../../../components/Sprite";
import { useListenServerEvent } from "../../../../hooks";
import { centerizeStyle } from "../../../../styles";
import { ANIMATION_STEP, COMMON_PROPS } from "./constants";

const OverchargedAnimation = (): JSX.Element => {
  const [isOvercharged, overcharge] = useState(false);
  const [sound] = useAtom(soundAtom);

  const stabilize = () => overcharge(false);

  useListenServerEvent(SERVER_EVENT_NAME.Overcharged, () => overcharge(true));

  useEffect(() => {
    if (isOvercharged) sound?.play("Overcharged");
  }, [isOvercharged]);

  return (
    <>
      {isOvercharged && (
        <Sprite css={centerizeStyle} {...COMMON_PROPS} steps={ANIMATION_STEP} row={1} onAnimationEnd={stabilize} />
      )}
    </>
  );
};

export default OverchargedAnimation;
