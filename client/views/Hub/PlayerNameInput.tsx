import { useAtom } from "jotai";
import { useCallback } from "react";
import { CLIENT_EVENT_NAME } from "../../../shared/constants";
import { IntegrateInput } from "../../components/Input";
import socket from "../../services/socket";
import { playerNameAtom, roomAtom } from "./atom";

// TODO add rename button

const PlayerNameInput = (): JSX.Element => {
  const [name, setName] = useAtom(playerNameAtom);
  const [room] = useAtom(roomAtom);

  const changeName = useCallback((value = "") => {
    socket.emit(CLIENT_EVENT_NAME.Rename, value);
    setName(value);
  }, []);

  return (
    <IntegrateInput disabled={!!room} defaultValue={name} onClick={changeName}>
      Change
    </IntegrateInput>
  );
};

export default PlayerNameInput;
