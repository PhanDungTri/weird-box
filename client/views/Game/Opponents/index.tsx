import { useEffect, useState } from "react";
import { PlayerInfo } from "../../../../shared/@types";
import { SERVER_EVENT_NAME } from "../../../../shared/constants";
import socket from "../../../services/socket";
import EmptySlot from "./EmptySlot";
import Opponent from "./Opponent";
import { opponentsStyle } from "./styles";

const Opponents = (): JSX.Element => {
  const [opponents, setOpponents] = useState<PlayerInfo[]>([]);

  useEffect(
    () =>
      void socket.once(SERVER_EVENT_NAME.GetPlayerList, (infos) =>
        setOpponents(infos.filter((p) => p.id !== socket.id))
      ),
    []
  );

  const showOpponents = () => {
    const elm: JSX.Element[] = [];

    for (let i = 0; i < 3; i++)
      if (opponents[i]) elm.push(<Opponent {...opponents[i]} key={opponents[i].id} />);
      else elm.push(<EmptySlot key={i} />);

    return elm;
  };

  return <div css={opponentsStyle}>{showOpponents()}</div>;
};

export default Opponents;
