import { useRef } from "react";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import Button from "../../components/Button";
import Input from "../../components/Input";
import socket from "../../services/socket";
import useNameState from "../../state/nameState";
import { hubStyle } from "./styles";

const Hub = (): JSX.Element => {
  const [name, setName] = useNameState();
  const input = useRef("");

  const findGame = () =>
    void socket.emit(SOCKET_EVENT.Rename, input.current, (name: string) => {
      setName(name);
      socket.emit(SOCKET_EVENT.FindGame);
    });

  return (
    <div css={hubStyle}>
      <div>UNTITLED CARD GAME</div>
      <Input defaultValue={name} onChange={(e) => (input.current = e.target.value)} />
      <Button onClick={findGame}>Find game</Button>
      <Button>How to play</Button>
      <Button>About</Button>
    </div>
  );
};

export default Hub;
