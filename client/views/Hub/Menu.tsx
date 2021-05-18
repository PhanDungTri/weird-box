import { useAtom } from "jotai";
import { useState } from "react";
import { GameMatchingStatus } from "../../../shared/@types";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../shared/constants";
import { roomAtom } from "../../atoms";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import { useListenServerEvent } from "../../hooks";
import socket from "../../services/socket";
import { centerizeContainerStyle, gridStyle } from "../../styles";

const Menu = (): JSX.Element => {
  const [room] = useAtom(roomAtom);
  const [isMatching, matching] = useState(false);

  const findGame = () => {
    socket.emit(CLIENT_EVENT_NAME.FindGame);
  };

  const createRoom = () => {
    socket.emit(CLIENT_EVENT_NAME.CreateRoom);
  };

  useListenServerEvent(SERVER_EVENT_NAME.UpdateGameMatchingStatus, (status: GameMatchingStatus) =>
    matching(status !== "canceled")
  );

  return (
    <div>
      {isMatching ? (
        <Loading text="Finding opponents..." />
      ) : (
        <div css={[gridStyle, centerizeContainerStyle]}>
          {!room && <Button onClick={createRoom}>Create room</Button>}
          {(!room || (room && room.owner === socket.id)) && <Button onClick={findGame}>Find game</Button>}
          <Button>How to play</Button>
          <Button>About</Button>
        </div>
      )}
    </div>
  );
};

export default Menu;
