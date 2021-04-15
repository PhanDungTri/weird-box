import { css } from "@emotion/react";
import { memo, useState } from "react";
import { SERVER_EVENT_NAME } from "../../../../../shared/constants";
import { useListenServerEvent } from "../../../../hooks";
import { centerizeStyle } from "../../../../styles";
import { hitPointBarStyle, hitPointCapacityStyle, hitPointCapacityUnderlayStyle } from "./styles";

type HitPointBarProps = {
  id: string;
  maxHP: number;
};

const HitPointBar = ({ id, maxHP }: HitPointBarProps): JSX.Element => {
  const [hp, setHP] = useState(maxHP);

  useListenServerEvent(SERVER_EVENT_NAME.HitPointChanged, (target: string, hp: number) => target === id && setHP(hp));

  return (
    <div css={hitPointBarStyle}>
      <div css={[hitPointCapacityStyle((hp * 100) / maxHP), hitPointCapacityUnderlayStyle]} />
      <div css={hitPointCapacityStyle((hp * 100) / maxHP)} />
      <div
        css={[
          css`
            font-weight: bold;
          `,
          centerizeStyle,
        ]}
      >
        {hp}
      </div>
    </div>
  );
};

export default memo(HitPointBar);
