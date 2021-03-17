import { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../../../../shared/src/@enums";
import IdleSprite from "../../../../assets/sprites/box_of_cards.png";
import DealCardSprite from "../../../../assets/sprites/box_of_cards_deal_card.png";
import OverChargedSprite from "../../../../assets/sprites/box_of_cards_overcharged.png";
import SpriteSheet from "../../../../components/SpriteSheet";
import socket from "../../../../services/socket";
import { centerizeStyle } from "../../../../styles";

type State = "idle" | "deal";

const boxOfCardAnimationState = {
  idle: {
    src: IdleSprite,
    steps: 1,
  },
  deal: {
    src: DealCardSprite,
    steps: 11,
  },
};

const commonProps = {
  size: [59, 59] as [number, number],
  scale: 3,
  css: centerizeStyle,
};

const BoxOfCard = (): JSX.Element => {
  const [state, setState] = useState<State>("idle");
  const [isOvercharged, overcharge] = useState(false);

  useEffect(() => {
    socket.on(SOCKET_EVENT.TakeCard, () => setState("deal"));
    socket.on(SOCKET_EVENT.ChargePointBarOvercharged, () => overcharge(true));

    return () => {
      socket.off(SOCKET_EVENT.TakeCard);
      socket.off(SOCKET_EVENT.ChargePointBarOvercharged);
    };
  }, []);

  return (
    <>
      <SpriteSheet
        key={state}
        onAnimationEnd={() => setState("idle")}
        {...boxOfCardAnimationState[state]}
        {...commonProps}
      />
      {isOvercharged && (
        <SpriteSheet src={OverChargedSprite} steps={9} {...commonProps} onAnimationEnd={() => overcharge(false)} />
      )}
    </>
  );
};

export default BoxOfCard;
