import { useEffect, useState } from "react";
import { PASSIVE_ACTION, SOCKET_EVENT, SPELL_NAME } from "../../../../../shared/src/@enums";
import { PassiveAction, SpellInfo } from "../../../../../shared/src/@types";
import Sprite from "../../../components/Sprite";
import socket from "../../../services/socket";
import spellAnimationLookup from "./spellAnimationLookup";

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
    <Sprite
      style={{ zIndex: 2 }}
      {...spellAnimationLookup[animation]}
      tick={3}
      repeat={0}
      size={[62, 46]}
      scale={scale}
      centerize
    />
  );
};

export default SpellAnimation;
