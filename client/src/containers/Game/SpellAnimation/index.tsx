import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { PASSIVE_ACTION, SOCKET_EVENT, SPELL_NAME } from "../../../../../shared/src/@enums";
import { PassiveAction, SpellInfo } from "../../../../../shared/src/@types";
import SpriteSheet from "../../../components/SpriteSheet";
import socket from "../../../services/socket";
import { centerizeStyle } from "../../../styles";
import spellAnimationLookup, { AnimationProps } from "./spellAnimationLookup";

type SpellAnimationProps = {
  id: string;
  scale?: number;
};

const SpellAnimation = ({ id, scale = 2 }: SpellAnimationProps): JSX.Element => {
  const [animation, setAnimation] = useState<SPELL_NAME | PASSIVE_ACTION>(SPELL_NAME.Void);

  useEffect(() => {
    let cleanUpTimeout: number;

    socket.on(SOCKET_EVENT.TakeSpell, (spell: SpellInfo) => {
      if (spell.target === id) {
        setAnimation(spell.name);
        cleanUpTimeout = setTimeout(() => setAnimation(SPELL_NAME.Void), 450);
      }
    });

    socket.on(SOCKET_EVENT.ActivatePassive, (payload: PassiveAction) => {
      if (payload.target === id) {
        setAnimation(payload.action);
        cleanUpTimeout = setTimeout(() => setAnimation(SPELL_NAME.Void), 450);
      }
    });

    return () => {
      socket.off(SOCKET_EVENT.TakeSpell);
      clearTimeout(cleanUpTimeout);
    };
  }, []);

  return animation === SPELL_NAME.Void ? (
    <></>
  ) : (
    <SpriteSheet
      {...(spellAnimationLookup[animation] as AnimationProps)}
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
