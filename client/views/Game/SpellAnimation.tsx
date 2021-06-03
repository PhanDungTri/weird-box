import { useAtom } from "jotai";
import { memo, useCallback, useRef, useState } from "react";
import { PassiveAction, SpellInfo } from "../../../shared/@types";
import { PASSIVE_ACTION, SERVER_EVENT_NAME, SPELL_NAME } from "../../../shared/constants";
import SpellAnimationSprite from "url:../../assets/sprites/spell_animations.png";
import { soundAtom } from "../../atoms";
import Sprite from "../../components/Sprite";
import { useListenServerEvent } from "../../hooks";
import { centerizeStyle } from "../../styles";

type Effects = SPELL_NAME | PASSIVE_ACTION;

const STEPS = 8;
const WIDTH = 62;
const HEIGHT = 46;

const SPELL_ANIMATION_POS: Effects[] = [
  SPELL_NAME.Heal,
  SPELL_NAME.Mirror,
  PASSIVE_ACTION.MirrorPierce,
  PASSIVE_ACTION.Reflect,
  SPELL_NAME.Poison,
  SPELL_NAME.Punch,
  SPELL_NAME.Shield,
  PASSIVE_ACTION.Block,
  PASSIVE_ACTION.ShieldPierce,
];

type SpellAnimationProps = {
  id: string;
  scale?: number;
};

const SpellAnimation = ({ id, scale = 2 }: SpellAnimationProps): JSX.Element => {
  const [sound] = useAtom(soundAtom);
  const [spell, setSpell] = useState<Effects>(SPELL_NAME.Void);
  const spellSounds = useRef<Partial<Record<Effects, (frame: number) => void>>>({
    [SPELL_NAME.Punch]: (frame) => {
      if (frame === 1) sound?.play("Swoosh");
      if (frame === 3) sound?.play("Punch");
    },
    [SPELL_NAME.Poison]: (frame) => {
      if (frame === 1) sound?.play("Poison");
    },
    [SPELL_NAME.Heal]: (frame) => {
      if (frame === 1) sound?.play("Heal");
    },
    [SPELL_NAME.Shield]: (frame) => {
      if (frame === 1) sound?.play("Shield");
    },
    [SPELL_NAME.Mirror]: (frame) => {
      if (frame === 1) sound?.play("Mirror");
    },
    [PASSIVE_ACTION.Reflect]: (frame) => {
      if (frame === 3) sound?.play("MirrorReflect");
    },
    [PASSIVE_ACTION.Block]: (frame) => {
      if (frame === 1) sound?.play("ShieldBlock");
    },
    [PASSIVE_ACTION.ShieldPierce]: (frame) => {
      if (frame === 1) sound?.play("ShieldBreak");
    },
    [PASSIVE_ACTION.MirrorPierce]: (frame) => {
      if (frame === 1) sound?.play("MirrorBreak");
    },
  });

  const onAnimationEnd = useCallback(() => setSpell(SPELL_NAME.Void), []);

  useListenServerEvent(SERVER_EVENT_NAME.TakeSpell, (spell: SpellInfo) => spell.target === id && setSpell(spell.name));
  useListenServerEvent(
    SERVER_EVENT_NAME.ActivatePassive,
    (passive: PassiveAction) => passive.target === id && setSpell(passive.action)
  );

  return (
    <>
      {spell !== SPELL_NAME.Void && (
        <Sprite
          src={SpellAnimationSprite}
          steps={STEPS}
          size={[WIDTH, HEIGHT]}
          scale={scale}
          row={SPELL_ANIMATION_POS.indexOf(spell)}
          onAnimationEnd={onAnimationEnd}
          onReachFrame={spellSounds.current[spell]}
          css={[centerizeStyle, { zIndex: 2 }]}
        />
      )}
    </>
  );
};

export default memo(SpellAnimation);
