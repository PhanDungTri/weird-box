import { css } from "@emotion/react";
import { memo, useCallback, useEffect, useState } from "react";
import { PassiveAction, SERVER_EVENT_NAME, SpellInfo } from "../../../../shared/@types";
import { PASSIVE_ACTION, SPELL_NAME } from "../../../../shared/constants";
import SpriteSheet from "../../../components/SpriteSheet";
import socket from "../../../services/socket";
import { centerizeStyle } from "../../../styles";
import spellAnimationLookup, { AnimationProps } from "./spellAnimationLookup";

type SpellAnimationProps = {
  id: string;
  scale?: number;
};

const SpellAnimation = ({ id, scale = 2 }: SpellAnimationProps): JSX.Element => {
  const [spell, setSpell] = useState<SPELL_NAME | PASSIVE_ACTION>(SPELL_NAME.Void);

  const onAnimationEnd = useCallback(() => setSpell(SPELL_NAME.Void), []);

  useEffect(() => {
    const onTakeSpell = (spell: SpellInfo) => spell.target === id && setSpell(spell.name);
    const onActivePassive = (passive: PassiveAction) => passive.target === id && setSpell(passive.action);

    socket.on(SERVER_EVENT_NAME.TakeSpell, onTakeSpell);
    socket.on(SERVER_EVENT_NAME.ActivatePassive, onActivePassive);
    return () => {
      socket.off(SERVER_EVENT_NAME.TakeSpell, onTakeSpell);
      socket.off(SERVER_EVENT_NAME.ActivatePassive, onActivePassive);
    };
  }, []);

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
