import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { GameMatchingStatus } from "../../../shared/@types";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../shared/constants";
import { languageAtom, roomAtom } from "../../atoms";
import IntegrateInput from "../../components/IntegrateInput";
import { useListenServerEvent, useLocalStorage } from "../../hooks";
import { useNotify } from "../../hooks/useNotify";
import socket from "../../services/socket";

const PlayerNameInput = (): JSX.Element => {
  const notify = useNotify();
  const [name, setName] = useLocalStorage("name", "player");
  const [isDisabled, disable] = useState(false);
  const [language] = useAtom(languageAtom);
  const [room] = useAtom(roomAtom);

  const changeName = useCallback((value = "") => {
    if (value) {
      socket.emit(CLIENT_EVENT_NAME.Rename, value);
      setName(value);
    } else notify("errNameLength", "Danger");
  }, []);

  useEffect(() => void changeName(name), []);

  useEffect(() => {
    if (room) disable(true);
    else disable(false);
  }, [room]);

  useListenServerEvent(SERVER_EVENT_NAME.UpdateGameMatchingStatus, (status: GameMatchingStatus) =>
    disable(status !== "Canceled")
  );

  return (
    <IntegrateInput
      minLength={2}
      maxLength={24}
      disabled={isDisabled}
      defaultValue={name as string}
      onClick={changeName}
    >
      {language.change}
    </IntegrateInput>
  );
};

export default PlayerNameInput;
