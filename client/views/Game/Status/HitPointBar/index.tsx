import { css } from "@emotion/react";
import { memo, useEffect, useState } from "react";
import { SERVER_EVENT_NAME } from "../../../../../shared/@types";
import socket from "../../../../services/socket";
import { centerizeStyle } from "../../../../styles";
import { hitPointBarStyle, hitPointCapacityStyle, hitPointCapacityUnderlayStyle } from "./styles";

type HitPointBarProps = {
  id: string;
  maxHP: number;
};

const HitPointBar = ({ id, maxHP }: HitPointBarProps): JSX.Element => {
  const [hp, setHP] = useState(0);

  useEffect(() => {
    const onChangeHP = (target: string, hp: number) => {
      if (target === id) setHP(hp);
    };
    socket.on(SERVER_EVENT_NAME.HitPointChanged, onChangeHP);
    return () => void socket.off(SERVER_EVENT_NAME.HitPointChanged, onChangeHP);
  }, []);

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
