import { useAtom } from "jotai";
import { CLIENT_EVENT_NAME } from "../../../shared/constants";
import { languageAtom, roomAtom } from "../../atoms";
import Button from "../../components/Button";
import CenterizedGrid from "../../components/CenterizedGrid";
import socket from "../../services/socket";

const Menu = (): JSX.Element => {
  const [room] = useAtom(roomAtom);
  const [language] = useAtom(languageAtom);

  const findGame = () => {
    socket.emit(CLIENT_EVENT_NAME.FindGame);
  };

  const createRoom = () => {
    socket.emit(CLIENT_EVENT_NAME.CreateRoom);
  };

  return (
    <CenterizedGrid>
      {!room && <Button onClick={createRoom}>{language.createRoom}</Button>}
      {(!room || room.owner === socket.id) && <Button onClick={findGame}>{language.play}</Button>}
    </CenterizedGrid>
  );
};

export default Menu;
