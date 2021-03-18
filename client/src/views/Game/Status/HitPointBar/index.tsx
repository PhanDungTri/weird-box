import { css } from "@emotion/react";
import { centerizeStyle } from "../../../../styles";
import { hitPointBarStyle, hitPointCapacityStyle, hitPointCapacityUnderlayStyle } from "./styles";

type HitPointBarProps = {
  hp: number;
  maxHP: number;
};

const HitPointBar = ({ hp, maxHP }: HitPointBarProps): JSX.Element => {
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

export default HitPointBar;
