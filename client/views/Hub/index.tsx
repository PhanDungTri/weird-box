import { useRef } from "react";
import { animated, useTransition } from "react-spring";
import create from "zustand";
import { CLIENT_EVENT_NAME } from "../../../shared/@types";
import { SOCKET_EVENT } from "../../../shared/constants";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import { useAppState } from "../../hooks/useStore";
import socket from "../../services/socket";
import { centerizeContainerStyle, gridStyle, pageStyle } from "../../styles";
import GameConfirmDialog from "./GameConfirmDialog";
import { optionMenuStyle } from "./styles";

type NameState = {
  name: string;
  changeName: (name: string) => void;
};

const usePlayerName = create<NameState>((set) => ({
  name: "player",
  changeName: (name: string) => set({ name }),
}));

const useFindingStatus = create((set) => ({
  status: GameFin,
}));

const Hub = (): JSX.Element => {
  const name = usePlayerName((state) => state.name);
  const changeName = usePlayerName((state) => state.changeName);
  const isFindingGame = useAppState((state) => state.findingStatus !== "canceled");
  const setFindingStatus = useAppState((state) => state.setFindingStatus);
  const input = useRef(name);
  const transitions = useTransition(isFindingGame, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const findGame = () => {
    socket.emit(CLIENT_EVENT_NAME.FindGame, input.current);
  };

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
