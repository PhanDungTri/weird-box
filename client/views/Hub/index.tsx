import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { GameMatchingStatus } from "../../../shared/@types";
import { SERVER_EVENT_NAME } from "../../../shared/constants";
import { routeAtom } from "../../atoms";
import { ROUTE } from "../../constants";
import { useListenServerEvent } from "../../hooks";
import socket from "../../services/socket";
import { centerizeContainerStyle, gridStyle, pageStyle } from "../../styles";
import FindingGame from "./FindingGame";
import GameConfirmDialog from "./GameConfirmDialog";
import Menu from "./Menu";
import PlayerNameInput from "./PlayerNameInput";
import Room from "./Room";

const Hub = (): JSX.Element => {
  const [, changeRoute] = useAtom(routeAtom);
  const [isMatching, match] = useState(false);

  useEffect(() => void socket.once(SERVER_EVENT_NAME.NewGame, () => changeRoute(ROUTE.InGame)), []);

  useListenServerEvent(SERVER_EVENT_NAME.UpdateGameMatchingStatus, (status: GameMatchingStatus) =>
    match(status !== "Canceled")
  );

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

export default Hub;
