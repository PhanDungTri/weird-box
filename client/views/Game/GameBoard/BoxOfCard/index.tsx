import { useState } from "react";
import { SERVER_EVENT_NAME } from "../../../../../shared/constants";
import { useListenServerEvent } from "../../../../hooks";
import { centerizeStyle } from "../../../../styles";
import ChargePointBar from "./ChargePointBar";
import BoxSprite from "./BoxSprite";
import OverchargedAnimation from "./OverchargedAnimation";

const BoxOfCard = (): JSX.Element => {
  const [shouldDeal, deal] = useState(false);

  const idle = () => deal(false);

  useListenServerEvent(SERVER_EVENT_NAME.GetCards, () => deal(true));

  return (
    <div css={centerizeStyle}>
      <BoxSprite stop={!shouldDeal} onAnimationEnd={idle} />
      <ChargePointBar />
      <OverchargedAnimation />
    </div>
  );
};

export default BoxOfCard;
