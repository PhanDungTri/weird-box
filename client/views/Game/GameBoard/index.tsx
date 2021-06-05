import { css } from "@emotion/react";
import Emotion from "../../../components/Emotion";
import socket from "../../../services/socket";
import { xCenterStyle } from "../../../styles";
import BoxOfCard from "./BoxOfCard";
import DeckCounter from "./DeckCounter";
import RecentPlayedCard from "./RecentPlayedCard";
import SpellAction from "./SpellAction";
import { StyledGameBoard } from "./styles";

const GameBoard = (): JSX.Element => {
  return (
    <StyledGameBoard>
      <SpellAction />
      <BoxOfCard />
      <RecentPlayedCard />
      <DeckCounter />
      <Emotion
        id={socket.id}
        css={[
          css`
            bottom: 0;
          `,
          xCenterStyle,
        ]}
      />
    </StyledGameBoard>
  );
};

export default GameBoard;
