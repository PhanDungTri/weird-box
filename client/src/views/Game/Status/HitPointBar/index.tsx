import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { SOCKET_EVENT } from "../../../../../../shared/src/@enums";
import { GameSettings, HitPointChange } from "../../../../../../shared/src/@types";
import socket from "../../../../services/socket";
import { centerizeStyle } from "../../../../styles";
import { hitPointBarStyle, hitPointCapacityStyle, hitPointCapacityUnderlayStyle } from "./styles";

type HitPointBarProps = {
  id: string;
};

const HitPointBar = ({ id }: HitPointBarProps): JSX.Element => {
  const [hp, setHP] = useState(0);
  const maxHP = useRef(0);

  useEffect(() => {
    socket.on(SOCKET_EVENT.HitPointChanged, (payload: HitPointChange) => {
      if (payload.target === id) setHP(payload.hp);
    });

    socket.once(SOCKET_EVENT.GetGameSettings, (settings: GameSettings) => {
      setHP(settings.maxHP);
      maxHP.current = settings.maxHP;
    });

    return () => void socket.off(SOCKET_EVENT.HitPointChanged);
  }, []);

  return (
    <div css={hitPointBarStyle}>
      <div css={[hitPointCapacityStyle((hp * 100) / maxHP.current), hitPointCapacityUnderlayStyle]} />
      <div css={hitPointCapacityStyle((hp * 100) / maxHP.current)} />
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

export default HitPointBar;
