import React from "react";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import socket from "../../services/socket";

const Hub = (): JSX.Element => {
  const findGame = (): void => {
    socket.emit(SOCKET_EVENT.FindGame);
  };

  return (
    <div>
      <button onClick={findGame}>Find game</button>
    </div>
  );
};

export default Hub;
