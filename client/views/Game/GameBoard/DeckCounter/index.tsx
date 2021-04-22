import Sprite from "../../../../components/Sprite";
import DeckSprite from "../../../../assets/sprites/deck.png";
import { deckCounterStyle } from "./styles";
import { useState } from "react";
import { useListenServerEvent } from "../../../../hooks";
import { SERVER_EVENT_NAME } from "../../../../../shared/constants";
import { centerizeStyle } from "../../../../styles";

const DeckCounter = (): JSX.Element => {
  const [size, setSize] = useState(0);

  useListenServerEvent(SERVER_EVENT_NAME.NewTurn, (_: string, size: number) => setSize(size));

  return (
    <div css={deckCounterStyle}>
      <Sprite src={DeckSprite} size={[52, 64]} css={{ position: "static" }} />
      <div css={[centerizeStyle, { fontWeight: "bold" }]}>{size}</div>
    </div>
  );
};

export default DeckCounter;
