import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import Button from "../../components/Button";
import Input from "../../components/Input";
import socket from "../../services/socket";
import useNameState, { nameState } from "../../state/nameState";
import { hubStyle } from "./styles";

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
    <div css={hubStyle}>
      <div>UNTITLED CARD GAME</div>
      <Input default={name} onChange={changeName} />
      <Button onClick={findGame}>Find game</Button>
      <Button>How to play</Button>
      <Button>About</Button>
    </div>
  );
};

export default Hub;
