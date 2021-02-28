import React from "react";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import Button from "../../components/Button";
import Input from "../../components/Input";
import socket from "../../services/socket";
import useNameState, { nameState } from "../../state/nameState";
import "./Hub.scss";

const changeName = (() => {
  let timeout: number;

  return (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(
      () => socket.emit(SOCKET_EVENT.Rename, event.target.value, (name: string): void => nameState.set(name)),
      500
    );
  };
})();

const Hub = (): JSX.Element => {
  const name = useNameState().value;

  const findGame = (): void => void socket.emit(SOCKET_EVENT.FindGame);

  return (
    <div className="hub">
      <div>UNTITLED CARD GAME</div>
      <Input default={name} onChange={changeName} />
      <Button onClick={findGame}>Find game</Button>
      <Button onClick={findGame}>How to play</Button>
      <Button onClick={findGame}>About</Button>
    </div>
  );
};

export default Hub;
