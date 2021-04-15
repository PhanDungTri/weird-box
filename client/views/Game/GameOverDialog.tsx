import { useAtom } from "jotai";
import { memo, useState } from "react";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../shared/@types";
import { routeAtom } from "../../atoms";
import Dialog from "../../components/Dialog";
import ROUTE from "../../constants/ROUTE";
import { useListenServerEvent } from "../../hooks";
import socket from "../../services/socket";

const GameOverDialog = (): JSX.Element => {
  const [, changeRoute] = useAtom(routeAtom);
  const [shouldShow, show] = useState(false);
  const [shouldVictory, victory] = useState(false);

  const backToHub = () => {
    socket.emit(CLIENT_EVENT_NAME.LeaveGame);
    changeRoute(ROUTE.Hub);
  };

  useListenServerEvent(SERVER_EVENT_NAME.GameOver, (id: string) => {
    show(true);
    victory(id === socket.id);
  });

  return (
    <Dialog
      show={shouldShow}
      title={shouldVictory ? "victory" : "defeated"}
      confirmMessage="Back to Hub"
      onConfirm={backToHub}
      color={shouldVictory ? "#ece236" : "#122c4f"}
    >
      {shouldVictory ? <p>You are the Winner!</p> : <p>Better luck next time!</p>}
    </Dialog>
  );
};

export default memo(GameOverDialog);
