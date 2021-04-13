import { useEffect, useState } from "react";
import { CardInfo, SERVER_EVENT_NAME } from "../../../../shared/@types";
import IdleSprite from "../../../assets/sprites/box_of_cards.png";
import DealCardSprite from "../../../assets/sprites/box_of_cards_deal_card.png";
import OverChargedSprite from "../../../assets/sprites/box_of_cards_overcharged.png";
import SpriteSheet from "../../../components/SpriteSheet";
import socket from "../../../services/socket";
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
  const [status, setStatus] = useState<BoxOfCardStatus>("idle");

  useEffect(() => {
    const onOvercharge = () => overcharge(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onGetCards = (_: CardInfo[]) => setStatus("deal");

    socket.on(SERVER_EVENT_NAME.Overcharged, onOvercharge);
    socket.on(SERVER_EVENT_NAME.GetCards, onGetCards);

    return () => {
      socket.off(SERVER_EVENT_NAME.Overcharged, onOvercharge);
      socket.off(SERVER_EVENT_NAME.GetCards, onGetCards);
    };
  }, []);

  return (
    <>
      <SpriteSheet
        key={status}
        onAnimationEnd={() => setStatus("idle")}
        {...boxOfCardAnimationState[status]}
        {...commonProps}
      />
      {isOvercharged && (
        <SpriteSheet src={OverChargedSprite} steps={9} {...commonProps} onAnimationEnd={() => overcharge(false)} />
      )}
    </>
  );
};

export default BoxOfCard;
