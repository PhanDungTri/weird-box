import { useEffect } from "react";
import { CLIENT_EVENT_NAME } from "../../../shared/constants";
import BoxOfCardSprites from "url:../../assets/sprites/box_of_cards.png";
import ContentFrameSprite from "url:../../assets/sprites/card_content_frame.png";
import IconSprites from "url:../../assets/sprites/icons.png";
import SpellAnimations from "url:../../assets/sprites/spell_animations.png";
import withSpriteLoading from "../../HOCs/withSpriteLoading";
import socket from "../../services/socket";
import GameBoard from "./GameBoard";
import GameOverDialog from "./GameOverDialog";
import Opponents from "./Opponents";
import Player from "./Player";
import { StyledGame } from "./styles";
import WaitingForOthersDialog from "./WaitingForOthersDialog";

const Game = (): JSX.Element => {
  useEffect(() => void socket.emit(CLIENT_EVENT_NAME.ReadyConfirm, true), []);

  return (
    <StyledGame>
      <Opponents />
      <GameBoard />
      <Player />
      <GameOverDialog />
      <WaitingForOthersDialog />
    </StyledGame>
  );
};

export default withSpriteLoading(Game, [BoxOfCardSprites, ContentFrameSprite, IconSprites, SpellAnimations]);
