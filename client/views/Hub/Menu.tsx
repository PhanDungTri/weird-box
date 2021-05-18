import { useAtom } from "jotai";
import { CLIENT_EVENT_NAME } from "../../../shared/constants";
import { roomAtom } from "../../atoms";
import Button from "../../components/Button";
import socket from "../../services/socket";
import { centerizeContainerStyle, gridStyle } from "../../styles";

const Menu = (): JSX.Element => {
  const [room] = useAtom(roomAtom);

  const findGame = () => {
    socket.emit(CLIENT_EVENT_NAME.FindGame);
  };

  const createRoom = () => {
    socket.emit(CLIENT_EVENT_NAME.CreateRoom);
  };

  return (
    <div css={[gridStyle, centerizeContainerStyle]}>
      {!room && <Button onClick={createRoom}>Create room</Button>}
      {(!room || room.owner === socket.id) && <Button onClick={findGame}>Find game</Button>}
      <Button>How to play</Button>
      <Button>About</Button>
    </div>
  );
};

export default Menu;
