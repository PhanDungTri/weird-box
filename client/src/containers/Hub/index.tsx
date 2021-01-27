import React from "react";
import socket from "../../services/socket";
import SOCKET_EVENT from "../../../../shared/src/SocketEvent";

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
