import { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../../../shared/src/@enums";
import { PlayerInfo } from "../../../@types";
import Button from "../../../components/Button";
import socket from "../../../services/socket";
import "./GameOverDialog.scss";

type GameOverDialogProps = {
  onClose?: () => void;
};

const GameOverDialog = ({ onClose }: GameOverDialogProps): JSX.Element => {
  const [winner, setWinner] = useState<PlayerInfo>();

  useEffect(() => {
    socket.once(SOCKET_EVENT.GameOver, (winner: PlayerInfo) => setWinner(winner));
  }, []);

  return winner ? (
    <div className="game-over-dialog">
      <div className="game-over-dialog__body">
        <div className="game-over-dialog__content">
          {winner.id === socket.id ? (
            <>
              <p>VICTORY!</p>
              <p>You are the Winner!</p>
            </>
          ) : (
            <>
              <p>DEFEATED!</p>
              <p>{winner.name} is the winner!</p>
            </>
          )}
        </div>
        <div className="game-over-dialog__footer">
          <Button onClick={onClose}>Ok</Button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default GameOverDialog;
