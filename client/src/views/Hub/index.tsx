import { useEffect, useRef, useState } from "react";
import { animated, useTransition } from "react-spring";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import usePlayerName from "../../hooks/usePlayerName";
import socket from "../../services/socket";
import { centerizeContainerStyle, gridStyle, pageStyle } from "../../styles";
import GameConfirmDialog from "./GameConfirmDialog";
import { optionMenuStyle } from "./styles";

const Hub = (): JSX.Element => {
  const [name, setName] = usePlayerName();
  const [isFindingGame, setFindingGame] = useState(false);
  const input = useRef(name);
  const transitions = useTransition(isFindingGame, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const findGame = () =>
    void socket.emit(SOCKET_EVENT.Rename, input.current, (name: string) => {
      setName(name);
      setFindingGame(true);
      socket.emit(SOCKET_EVENT.FindGame);
    });

  useEffect(() => {
    socket.on(SOCKET_EVENT.GameCanceled, () => setFindingGame(false));
    return () => void socket.off(SOCKET_EVENT.GameCanceled);
  }, []);

  return (
    <div css={[pageStyle, gridStyle, centerizeContainerStyle]}>
      <div>UNTITLED CARD GAME</div>
      <Input defaultValue={name} onChange={(e) => (input.current = e.target.value)} />
      <div css={optionMenuStyle}>
        {transitions.map(({ item, props }) =>
          item ? (
            <animated.div style={props}>
              <Loading text="Finding opponents..." />
            </animated.div>
          ) : (
            <animated.div style={props} css={[gridStyle, centerizeContainerStyle]}>
              <Button onClick={findGame}>Find game</Button>
              <Button>How to play</Button>
              <Button>About</Button>
            </animated.div>
          )
        )}
      </div>
      <GameConfirmDialog onClose={() => setFindingGame(false)} />
    </div>
  );
};

export default Hub;
