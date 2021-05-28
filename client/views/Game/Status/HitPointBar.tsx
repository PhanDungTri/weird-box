import { memo, useState } from "react";
import { SERVER_EVENT_NAME } from "../../../../shared/constants";
import ProgressBar from "../../../components/ProgressBar";
import { useListenServerEvent } from "../../../hooks";

type HitPointBarProps = {
  id: string;
  maxHP: number;
};

const HitPointBar = ({ id, maxHP }: HitPointBarProps): JSX.Element => {
  const [hp, setHP] = useState(maxHP);

  useListenServerEvent(SERVER_EVENT_NAME.HitPointChanged, (target: string, hp: number) => target === id && setHP(hp));

  return <ProgressBar max={maxHP} current={hp} />;
};

export default memo(HitPointBar);
