import { useAtom } from "jotai";
import { useState } from "react";
import { animated, useTransition } from "react-spring";
import { GameMatchingStatus } from "../../../../shared/@types";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../../shared/constants";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import { useListenServerEvent } from "../../../hooks";
import socket from "../../../services/socket";
import { centerizeContainerStyle, gridStyle } from "../../../styles";
import { playerNameAtom } from "../atom";
import { optionMenuStyle } from "./styles";

const Menu = (): JSX.Element => {
  const [name] = useAtom(playerNameAtom);
  const [isMatching, matching] = useState(false);
  const transitions = useTransition(isMatching, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const findGame = () => {
    socket.emit(CLIENT_EVENT_NAME.FindGame, name);
  };

  useListenServerEvent(SERVER_EVENT_NAME.UpdateGameMatchingStatus, (status: GameMatchingStatus) =>
    matching(status !== "canceled")
  );

  return (
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
  );
};

export default Menu;
