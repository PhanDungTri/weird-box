import { Howl } from "howler";
import { useEffect, useState } from "react";
import { SERVER_EVENT_NAME } from "../../../../shared/constants";
import DealSound from "../../../assets/sounds/deal_pop.mp3";
import OverchargedSound from "../../../assets/sounds/overcharged.mp3";
import TakeSound from "../../../assets/sounds/take_card.mp3";
import IdleSprite from "../../../assets/sprites/box_of_cards.png";
import DealCardSprite from "../../../assets/sprites/box_of_cards_deal_card.png";
import OverChargedSprite from "../../../assets/sprites/box_of_cards_overcharged.png";
import SpriteSheet from "../../../components/SpriteSheet";
import { useListenServerEvent } from "../../../hooks";
import { centerizeStyle } from "../../../styles";

type BoxOfCardStatus = "idle" | "deal";

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
  const [isOvercharged, overcharge] = useState(false);
  const [overchargedSound] = useState(new Howl({ src: [OverchargedSound] }));
  const [takeSound] = useState(new Howl({ src: [TakeSound] }));
  const [dealSound] = useState(new Howl({ src: [DealSound] }));
  const [status, setStatus] = useState<BoxOfCardStatus>("idle");

  const idle = () => setStatus("idle");
  const stabilize = () => overcharge(false);

  useListenServerEvent(SERVER_EVENT_NAME.Overcharged, () => overcharge(true));
  useListenServerEvent(SERVER_EVENT_NAME.GetCards, () => setStatus("deal"));

  useEffect(() => {
    if (isOvercharged) overchargedSound.play();
  }, [isOvercharged]);

  return (
    <>
      <SpriteSheet
        key={status}
        onAnimationEnd={idle}
        onReachFrame={{
          7: () => {
            dealSound.play();
            takeSound.play();
          },
        }}
        {...boxOfCardAnimationState[status]}
        {...commonProps}
      />
      {isOvercharged && <SpriteSheet src={OverChargedSprite} steps={9} {...commonProps} onAnimationEnd={stabilize} />}
    </>
  );
};

export default BoxOfCard;
