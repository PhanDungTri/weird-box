import { useEffect, useState } from "react";
import { CardInfo, SERVER_EVENT_NAME } from "../../../../../shared/@types";
import socket from "../../../../services/socket";
import { centerizeStyle } from "../../../../styles";
import Card from "../../Card";
import { cardPlayedAnimation } from "./styles";

const RecentPlayedCard = (): JSX.Element => {
  const [card, setCard] = useState<CardInfo>();

  useEffect(() => {
    const onPlayCard = (card: CardInfo) => setCard(card);
    socket.on(SERVER_EVENT_NAME.CardPlayed, onPlayCard);
    return () => void socket.off(SERVER_EVENT_NAME.CardPlayed, onPlayCard);
  }, []);

  return (
    <>
      {card && (
        <div onAnimationEnd={() => setCard(undefined)} css={[cardPlayedAnimation, centerizeStyle]}>
          <Card card={card} />
        </div>
      )}
    </>
  );
};

export default RecentPlayedCard;
