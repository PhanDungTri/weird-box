import { css } from "@emotion/react";
import { memo } from "react";
import { PlayerInfo } from "../../../../shared/@types";
import Emotion from "../../../components/Emotion";
import { useOnEliminate } from "../../../hooks";
import { disabledStyle, xCenterStyle } from "../../../styles";
import SpellAnimation from "../SpellAnimation";
import Status from "../Status";
import { OpponentName, StyledOpponent } from "./styles";

const Opponent = ({ id, name }: PlayerInfo): JSX.Element => {
  const isEliminated = useOnEliminate(id);

  return (
    <StyledOpponent css={isEliminated && disabledStyle}>
      <Status id={id} />
      <OpponentName>{name}</OpponentName>
      <SpellAnimation id={id} />
      <Emotion
        id={id}
        css={[
          css`
            bottom: -58px;
          `,
          xCenterStyle,
        ]}
      />
    </StyledOpponent>
  );
};

export default memo(Opponent);
