import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { GameMatchingStatus } from "../../../shared/@types";
import { SERVER_EVENT_NAME } from "../../../shared/constants";
import { routeAtom, soundAtom } from "../../atoms";
import { ROUTE } from "../../constants";
import withSpriteLoading from "../../HOCs/withSpriteLoading";
import { useListenServerEvent } from "../../hooks";
import socket from "../../services/socket";
import { centerizeContainerStyle, gridStyle, pageStyle } from "../../styles";
import FindingGame from "./FindingGame";
import GameConfirmDialog from "./GameConfirmDialog";
import Menu from "./Menu";
import PlayerNameInput from "./PlayerNameInput";
import Room from "./Room";
import IconSprites from "../../assets/sprites/icons.png";
import LoadingSpriteSheet from "../../assets/sprites/loading_animation.png";

const Hub = (): JSX.Element => {
  const [sound] = useAtom(soundAtom);
  const [, changeRoute] = useAtom(routeAtom);
  const [isMatching, match] = useState(false);

  useEffect(() => void socket.once(SERVER_EVENT_NAME.NewGame, () => changeRoute(ROUTE.InGame)), []);

  useListenServerEvent(SERVER_EVENT_NAME.UpdateGameMatchingStatus, (status: GameMatchingStatus) =>
    match(status !== "Canceled")
  );

  useListenServerEvent(SERVER_EVENT_NAME.FriendJoined, () => sound?.play("KnockDoor"));
  useListenServerEvent(SERVER_EVENT_NAME.FriendLeft, () => sound?.play("DoorClose"));
  useListenServerEvent(SERVER_EVENT_NAME.LeftRoom, () => sound?.play("DoorClose"));
  useListenServerEvent(SERVER_EVENT_NAME.JoinedRoom, () => sound?.play("KnockDoor"));

  return (
    <div css={[pageStyle, gridStyle, centerizeContainerStyle]}>
      <div>UNTITLED CARD GAME</div>
      <PlayerNameInput />
      {isMatching ? (
        <FindingGame />
      ) : (
        <>
          <Menu />
          <Room />
        </>
      )}
      <GameConfirmDialog />
    </div>
  );
};

export default withSpriteLoading(Hub, [IconSprites, LoadingSpriteSheet]);
