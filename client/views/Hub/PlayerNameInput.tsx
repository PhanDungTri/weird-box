import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import { GameMatchingStatus } from "../../../shared/@types";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../shared/constants";
import { languageAtom } from "../../atoms";
import IntegrateInput from "../../components/IntegrateInput";
import { useListenServerEvent } from "../../hooks";
import socket from "../../services/socket";
import { playerNameAtom } from "./atom";

const PlayerNameInput = (): JSX.Element => {
  const [name, setName] = useAtom(playerNameAtom);
  const [isDisabled, disable] = useState(false);
  const [language] = useAtom(languageAtom);

  const changeName = useCallback((value = "") => {
    socket.emit(CLIENT_EVENT_NAME.Rename, value);
    setName(value);
  }, []);

  useListenServerEvent(SERVER_EVENT_NAME.LeftRoom, () => disable(false));
  useListenServerEvent(SERVER_EVENT_NAME.GetRoomInfo, () => disable(true));
  useListenServerEvent(SERVER_EVENT_NAME.UpdateGameMatchingStatus, (status: GameMatchingStatus) =>
    disable(status !== "Canceled")
  );

  return (
    <IntegrateInput disabled={isDisabled} defaultValue={name} onClick={changeName}>
      {language.change}
    </IntegrateInput>
  );
};

export default PlayerNameInput;
