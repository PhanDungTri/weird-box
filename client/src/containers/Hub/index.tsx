import { css } from "@emotion/react";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import Button from "../../components/Button";
import Input from "../../components/Input";
import socket from "../../services/socket";
import useNameState, { nameState } from "../../state/nameState";

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

const style = css`
  display: grid;
  height: 100vw;
  width: 100vw;
  gap: 4px;
  justify-content: center;
  justify-items: center;
  align-content: center;
`;

const Hub = (): JSX.Element => {
  const name = useNameState().value;

  const findGame = (): void => void socket.emit(SOCKET_EVENT.FindGame);

  return (
    <div css={style}>
      <div>UNTITLED CARD GAME</div>
      <Input default={name} onChange={changeName} />
      <Button onClick={findGame}>Find game</Button>
      <Button onClick={findGame}>How to play</Button>
      <Button onClick={findGame}>About</Button>
    </div>
  );
};

export default Hub;
