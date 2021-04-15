import { useState } from "react";
import { CardInfo } from "../../../../../shared/@types";
import { SERVER_EVENT_NAME } from "../../../../../shared/constants";
import { useListenServerEvent } from "../../../../hooks";
import { centerizeStyle } from "../../../../styles";
import Card from "../../Card";
import { cardPlayedAnimation } from "./styles";

const RecentPlayedCard = (): JSX.Element => {
  const [card, setCard] = useState<CardInfo>();

  useListenServerEvent(SERVER_EVENT_NAME.CardPlayed, (card: CardInfo) => setCard(card));

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
