import React, { useEffect, useState } from "react";
import SOCKET_EVENT from "../../../../../../shared/src/socketEvent";
import IdleSprite from "../../../../assets/sprites/box_of_cards.png";
import DealCardSprite from "../../../../assets/sprites/box_of_cards_deal_card.png";
import OverChargedSprite from "../../../../assets/sprites/box_of_cards_overcharged.png";
import Sprite from "../../../../components/Sprite";
import useSocketEvent from "../../../../hooks/useSocketEvent";
import "../../../../styles/common/centerize.scss";

type State = "idle" | "deal" | "overcharged";

const setSprite = (state: State): JSX.Element => {
  let spriteProps = {
    src: IdleSprite,
    step: 1,
  };

  if (state === "deal")
    spriteProps = {
      src: DealCardSprite,
      step: 10,
    };

  return <Sprite key={state} size={[59, 59]} scale={3} {...spriteProps} tick={3} />;
};

const BoxOfCard = (): JSX.Element => {
  const [state, setState] = useState<State>("idle");

  useSocketEvent(SOCKET_EVENT.TakeCard, () => setState("deal"));
  useSocketEvent(SOCKET_EVENT.ChargePointBarOvercharged, () => setState("overcharged"));

  useEffect(() => {
    const resetState = setTimeout(() => setState("idle"), 600);

    return () => {
      clearTimeout(resetState);
    };
  }, [state]);

  return (
    <>
      <div className="centerize">{setSprite(state)}</div>
      {state === "overcharged" && (
        <div className="centerize">
          <Sprite key="overcharged" size={[59, 59]} scale={3} tick={3} step={9} src={OverChargedSprite} />
        </div>
      )}
    </>
  );
};

export default BoxOfCard;
