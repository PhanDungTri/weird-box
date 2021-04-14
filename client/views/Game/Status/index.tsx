import { memo, useEffect, useState } from "react";
import { SERVER_EVENT_NAME } from "../../../../shared/@types";
import { DEFAULT_MAX_HP, DEFAULT_TIME_PER_TURN } from "../../../../shared/constants";
import socket from "../../../services/socket";
import HitPointBar from "./HitPointBar";
import Spells from "./Spells";
import { horizontalStatusStyle, statusStyle } from "./styles";
import Timer from "./Timer";

type StatusProps = {
  id: string;
  horizontal?: boolean;
};

const Status = ({ id, horizontal = false }: StatusProps): JSX.Element => {
  const [maxHP, setMaxHP] = useState(DEFAULT_MAX_HP);
  const [timePerTurn, setTimePerTurn] = useState(DEFAULT_TIME_PER_TURN);

  useEffect(
    () =>
      void socket.once(SERVER_EVENT_NAME.GetGameSettings, (maxHP, timePerTurn) => {
        setMaxHP(maxHP);
        setTimePerTurn(timePerTurn);
      }),
    []
  );

  return (
    <div css={[statusStyle, horizontal && horizontalStatusStyle]}>
      <HitPointBar id={id} maxHP={maxHP} />
      <Spells id={id} align={horizontal ? "left" : "center"} />
      <Timer id={id} timePerTurn={timePerTurn} fluid={horizontal} />
    </div>
  );
};

export default memo(Status);
