import React from "react";
import { Winner } from "../..";
import Button from "../../../../components/Button";
import socket from "../../../../services/socket";
import "./GameOverDialog.scss";

interface GameOverDialogProps {
  open: boolean;
  winner: Winner;
  onClose?: () => void;
}

const GameOverDialog = ({ open, onClose, winner }: GameOverDialogProps): JSX.Element => {
  return open ? (
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
