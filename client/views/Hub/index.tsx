import { useAtom } from "jotai";
import { useEffect } from "react";
import { SERVER_EVENT_NAME } from "../../../shared/constants";
import { routeAtom } from "../../atoms";
import ROUTE from "../../constants/ROUTE";
import socket from "../../services/socket";
import { centerizeContainerStyle, gridStyle, pageStyle } from "../../styles";
import GameConfirmDialog from "./GameConfirmDialog";
import Menu from "./Menu";
import PlayerNameInput from "./PlayerNameInput";
import Room from "./Room";

const Hub = (): JSX.Element => {
  const [, changeRoute] = useAtom(routeAtom);

  useEffect(() => void socket.once(SERVER_EVENT_NAME.NewGame, () => changeRoute(ROUTE.InGame)), []);

  return (
    <div css={[pageStyle, gridStyle, centerizeContainerStyle]}>
      <div>UNTITLED CARD GAME</div>
      <PlayerNameInput />
      <Menu />
      <Room />
      <GameConfirmDialog />
    </div>
  );
};

export default Hub;
