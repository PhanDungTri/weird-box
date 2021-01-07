import React, { useEffect, useState } from "react";
import SOCKET_EVENT from "../../../../../../shared/src/socketEvent";
import IdleSprite from "../../../../assets/sprites/box_of_cards.png";
import DealCardSprite from "../../../../assets/sprites/box_of_cards_deal_card.png";
import OverChargedSprite from "../../../../assets/sprites/box_of_cards_overcharged.png";
import Sprite from "../../../../components/Sprite";
import socket from "../../../../global/socket";

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

  return (
    <Sprite
      centerize
      key={state === "overcharged" ? "idle" : state}
      size={[59, 59]}
      scale={3}
      {...spriteProps}
      tick={3}
    />
  );
};

const BoxOfCard = (): JSX.Element => {
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    const resetState = setTimeout(() => setState("idle"), 600);

    return () => {
      clearTimeout(resetState);
    };
  }, [state]);

  useEffect(() => {
    socket.on(SOCKET_EVENT.TakeCard, () => setState("deal"));
    socket.on(SOCKET_EVENT.ChargePointBarOvercharged, () => setState("overcharged"));

    return (): void => {
      console.log("off");
      socket.off(SOCKET_EVENT.TakeCard);
      socket.off(SOCKET_EVENT.ChargePointBarOvercharged);
    };
  }, []);

  return (
    <>
      {setSprite(state)}
      {state === "overcharged" && (
        <Sprite centerize key="overcharged" size={[59, 59]} scale={3} tick={3} step={9} src={OverChargedSprite} />
      )}
    </>
  );
};

export default BoxOfCard;
