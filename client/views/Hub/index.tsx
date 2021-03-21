import { useRef } from "react";
import { animated, useTransition } from "react-spring";
import { SOCKET_EVENT } from "../../../shared/constants";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import { useAppState } from "../../hooks/useStore";
import socket from "../../services/socket";
import { centerizeContainerStyle, gridStyle, pageStyle } from "../../styles";
import GameConfirmDialog from "./GameConfirmDialog";
import { optionMenuStyle } from "./styles";

const Hub = (): JSX.Element => {
  const playerName = useAppState((state) => state.playerName);
  const changeName = useAppState((state) => state.changeName);
  const isFindingGame = useAppState((state) => state.findingStatus !== "canceled");
  const setFindingStatus = useAppState((state) => state.setFindingStatus);
  const input = useRef(playerName);
  const transitions = useTransition(isFindingGame, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const findGame = () =>
    void socket.emit(SOCKET_EVENT.Rename, input.current, (name: string) => {
      changeName(name);
      setFindingStatus("finding");
      socket.emit(SOCKET_EVENT.FindGame);
    });

  return (
    <div css={[pageStyle, gridStyle, centerizeContainerStyle]}>
      <div>UNTITLED CARD GAME</div>
      <Input defaultValue={playerName} onChange={(e) => (input.current = e.target.value)} />
      <div css={optionMenuStyle}>
        {transitions.map(({ item, props }) =>
          item ? (
            <animated.div style={props} key="finding">
              <Loading text="Finding opponents..." />
            </animated.div>
          ) : (
            <animated.div style={props} css={[gridStyle, centerizeContainerStyle]} key="menu">
              <Button onClick={findGame}>Find game</Button>
              <Button>How to play</Button>
              <Button>About</Button>
            </animated.div>
          )
        )}
      </div>
      <GameConfirmDialog onClose={() => setFindingStatus("canceled")} />
    </div>
  );
};

export default Hub;
