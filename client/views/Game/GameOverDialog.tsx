import { useAtom } from "jotai";
import { memo, useEffect, useState } from "react";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../shared/constants";
import { routeAtom } from "../../atoms";
import Dialog from "../../components/Dialog";
import ROUTE from "../../constants/ROUTE";
import { useListenServerEvent } from "../../hooks";
import socket from "../../services/socket";
import VictorySound from "../../assets/sounds/victory.mp3";
import DefeatSound from "../../assets/sounds/defeat.mp3";
import { Howl } from "howler";

const GameOverDialog = (): JSX.Element => {
  const [, changeRoute] = useAtom(routeAtom);
  const [shouldShow, show] = useState(false);
  const [shouldVictory, victory] = useState(false);
  const [victorySound] = useState(new Howl({ src: [VictorySound] }));
  const [defeatSound] = useState(new Howl({ src: [DefeatSound] }));

  const backToHub = () => {
    socket.emit(CLIENT_EVENT_NAME.LeaveGame);
    changeRoute(ROUTE.Hub);
  };

  useListenServerEvent(SERVER_EVENT_NAME.GameOver, (id: string) => {
    show(true);
    victory(id === socket.id);
  });

  useEffect(() => {
    if (shouldShow) shouldVictory ? victorySound.play() : defeatSound.play();
  }, [shouldShow, shouldVictory]);

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
