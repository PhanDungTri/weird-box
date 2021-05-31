import { memo, useState } from "react";
import { SERVER_EVENT_NAME } from "../../../../../shared/constants";
import { getNumberSign } from "../../../../../shared/utils";
import ProgressBar from "../../../../components/ProgressBar";
import { COLOR } from "../../../../constants";
import { useListenServerEvent } from "../../../../hooks";
import { shadeColor } from "../../../../utils";
import { HPDiff } from "./styles";

type HitPointBarProps = {
  id: string;
  maxHP: number;
  goUp?: boolean;
};

const HitPointBar = ({ id, maxHP, goUp }: HitPointBarProps): JSX.Element => {
  const [hp, setHP] = useState(maxHP);
  const [diff, setDiff] = useState(0);

  useListenServerEvent(SERVER_EVENT_NAME.HitPointChanged, (target: string, newHP: number) => {
    if (target === id) {
      setHP((oldHP) => {
        setDiff(newHP - oldHP);
        return newHP;
      });
    }
  });

  return (
    <div css={{ position: "relative" }}>
      <ProgressBar max={maxHP} current={hp} />
      {diff !== 0 && (
        <HPDiff
          css={{ color: shadeColor(diff < 0 ? COLOR.Danger : COLOR.Safe, 20) }}
          onAnimationEnd={() => setDiff(0)}
          goUp={goUp}
        >
          {getNumberSign(diff) + Math.abs(diff)}
        </HPDiff>
      )}
    </div>
  );
};

export default memo(HitPointBar);
