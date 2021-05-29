import { css } from "@emotion/react";
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
  reverse?: boolean;
};

const HitPointBar = ({ id, maxHP, reverse }: HitPointBarProps): JSX.Element => {
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
    <div style={{ position: "relative" }}>
      <ProgressBar max={maxHP} current={hp} />
      {diff !== 0 && (
        <HPDiff
          css={css`
            color: ${shadeColor(diff < 0 ? COLOR.Danger : COLOR.Safe, 20)};
          `}
          onAnimationEnd={() => setDiff(0)}
          reverse={reverse}
        >
          {getNumberSign(diff) + Math.abs(diff)}
        </HPDiff>
      )}
    </div>
  );
};

export default memo(HitPointBar);
