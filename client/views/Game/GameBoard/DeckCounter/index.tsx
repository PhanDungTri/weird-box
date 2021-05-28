import { css } from "@emotion/react";
import { useState } from "react";
import { SERVER_EVENT_NAME } from "../../../../../shared/constants";
import Icon from "../../../../components/Icon";
import { useListenServerEvent } from "../../../../hooks";
import { centerizeStyle } from "../../../../styles";
import { deckCounterStyle } from "./styles";

const DeckCounter = (): JSX.Element => {
  const [size, setSize] = useState(0);

  useListenServerEvent(SERVER_EVENT_NAME.NewTurn, (_: string, size: number) => setSize(size));

  return (
    <div css={deckCounterStyle}>
      <Icon
        name="deck"
        scale={2}
        css={css`
          position: relative;
        `}
      />
      <div css={[centerizeStyle, { fontWeight: "bold" }]}>{size}</div>
    </div>
  );
};

export default DeckCounter;
