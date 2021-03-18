import { css } from "@emotion/react";
import { PASSIVE_ACTION, SPELL_NAME } from "../../../../../shared/src/@enums";
import SpriteSheet from "../../../components/SpriteSheet";
import { centerizeStyle } from "../../../styles";
import spellAnimationLookup, { AnimationProps } from "./spellAnimationLookup";

type SpellAnimationProps = {
  spell: SPELL_NAME | PASSIVE_ACTION;
  scale?: number;
};

const SpellAnimation = ({ spell, scale = 2 }: SpellAnimationProps): JSX.Element => {
  return (
    <SpriteSheet
      {...(spellAnimationLookup[spell] as AnimationProps)}
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

export default SpellAnimation;
