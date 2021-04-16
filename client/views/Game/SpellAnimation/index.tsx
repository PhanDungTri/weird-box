import { css } from "@emotion/react";
import { memo, useCallback, useEffect, useState } from "react";
import { PassiveAction, SpellInfo } from "../../../../shared/@types";
import { PASSIVE_ACTION, SERVER_EVENT_NAME, SPELL_NAME } from "../../../../shared/constants";
import SpriteSheet from "../../../components/SpriteSheet";
import { useListenServerEvent } from "../../../hooks";
import { centerizeStyle } from "../../../styles";
import spellAnimationLookup, { AnimationProps } from "./spellAnimationLookup";
import spellSoundLookup from "./spellSoundLookup";

type SpellAnimationProps = {
  id: string;
  scale?: number;
};

const SpellAnimation = ({ id, scale = 2 }: SpellAnimationProps): JSX.Element => {
  const [spell, setSpell] = useState<SPELL_NAME | PASSIVE_ACTION>(SPELL_NAME.Void);

  const onAnimationEnd = useCallback(() => setSpell(SPELL_NAME.Void), []);

  useListenServerEvent(SERVER_EVENT_NAME.TakeSpell, (spell: SpellInfo) => spell.target === id && setSpell(spell.name));
  useListenServerEvent(
    SERVER_EVENT_NAME.ActivatePassive,
    (passive: PassiveAction) => passive.target === id && setSpell(passive.action)
  );

  useEffect(() => {
    const sound = spellSoundLookup[spell];
    if (sound) sound.play();
  }, [spell]);

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
