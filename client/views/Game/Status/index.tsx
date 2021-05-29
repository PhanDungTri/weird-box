import { memo, useEffect, useState } from "react";
import { SERVER_EVENT_NAME } from "../../../../shared/constants";
import { DEFAULT_MAX_HP, DEFAULT_TIME_PER_TURN } from "../../../../shared/config";
import socket from "../../../services/socket";
import HitPointBar from "./HitPointBar";
import LeaveButton from "./LeaveButton";
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
      <HitPointBar id={id} maxHP={maxHP} reverse={horizontal} />
      <Spells id={id} align={horizontal ? "left" : "center"} />
      {horizontal && <LeaveButton />}
      <Timer id={id} timePerTurn={timePerTurn} fluid={horizontal} />
    </div>
  );
};

export default memo(Status);
