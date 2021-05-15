import { Howl } from "howler";
import { useAtom } from "jotai";
import { memo, useEffect, useState } from "react";
import { SERVER_EVENT_NAME } from "../../../shared/constants";
import DefeatSound from "../../assets/sounds/defeat.mp3";
import VictorySound from "../../assets/sounds/victory.mp3";
import { routeAtom } from "../../atoms";
import Dialog from "../../components/Dialog";
import ROUTE from "../../constants/ROUTE";
import socket from "../../services/socket";

const GameOverDialog = (): JSX.Element => {
  const [, changeRoute] = useAtom(routeAtom);
  const [shouldShow, show] = useState(false);
  const [shouldVictory, victory] = useState(false);
  const [victorySound] = useState(new Howl({ src: [VictorySound] }));
  const [defeatSound] = useState(new Howl({ src: [DefeatSound] }));

  const backToHub = () => changeRoute(ROUTE.Hub);

  useEffect(() => {
    socket.once(SERVER_EVENT_NAME.GameOver, (id: string) => {
      show(true);
      console.log(id, socket.id);
      victory(id === socket.id);
      id === socket.id ? victorySound.play() : defeatSound.play();
    });
  }, []);

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
