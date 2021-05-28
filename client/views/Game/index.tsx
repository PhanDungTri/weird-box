import { useEffect } from "react";
import { CLIENT_EVENT_NAME } from "../../../shared/constants";
import BoxOfCardSprites from "../../assets/sprites/box_of_cards.png";
import ContentFrameSprite from "../../assets/sprites/card_content_frame.png";
import IconSprites from "../../assets/sprites/icons.png";
import SpellAnimations from "../../assets/sprites/spell_animations.png";
import withSpriteLoading from "../../HOCs/withSpriteLoading";
import socket from "../../services/socket";
import GameBoard from "./GameBoard";
import GameOverDialog from "./GameOverDialog";
import Opponents from "./Opponents";
import Player from "./Player";
import gameStyle from "./styles";
import WaitingForOthersDialog from "./WaitingForOthersDialog";

const Game = (): JSX.Element => {
  useEffect(() => void socket.emit(CLIENT_EVENT_NAME.ReadyConfirm, true), []);

  return (
    <div css={gameStyle}>
      <Opponents />
      <GameBoard />
      <Player />
      <GameOverDialog />
      <WaitingForOthersDialog />
    </div>
  );
};

export default withSpriteLoading(Game, [BoxOfCardSprites, ContentFrameSprite, IconSprites, SpellAnimations]);
