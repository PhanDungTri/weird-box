import { css } from "@emotion/react";
import { memo } from "react";
import { PASSIVE_ACTION, SPELL_NAME } from "../../../../shared/constants";
import SpriteSheet from "../../../components/SpriteSheet";
import { centerizeStyle } from "../../../styles";
import spellAnimationLookup, { AnimationProps } from "./spellAnimationLookup";

type SpellAnimationProps = {
  spell: SPELL_NAME | PASSIVE_ACTION;
  scale?: number;
  onAnimationEnd?: () => void;
};

const SpellAnimation = ({ onAnimationEnd, spell, scale = 2 }: SpellAnimationProps): JSX.Element => {
  return (
    <SpriteSheet
      {...(spellAnimationLookup[spell] as AnimationProps)}
      onAnimationEnd={onAnimationEnd}
      size={[62, 46]}
      scale={scale}
      css={[
        centerizeStyle,
        css`
          z-index: 2;
        `,
      ]}
    />
  );
};

export default memo(SpellAnimation);
