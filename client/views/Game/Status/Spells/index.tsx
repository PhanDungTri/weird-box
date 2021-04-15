import produce from "immer";
import { memo, useState } from "react";
import { animated, useTransition } from "react-spring";
import { PassiveAction, SERVER_EVENT_NAME, SpellInfo } from "../../../../../shared/@types";
import { useListenServerEvent } from "../../../../hooks";
import { fadeOut } from "../../../../styles/animations";
import SpellIndicator from "./SpellIndicator";
import { spellsStyle } from "./styles";

type SpellsProps = {
  id: string;
  align?: "center" | "left";
};

const Spells = ({ id, align = "center" }: SpellsProps): JSX.Element => {
  const [spells, setSpells] = useState<Record<string, SpellInfo>>({});
  const transitions = useTransition(Object.values(spells), (s) => s.id, {
    from: { opacity: 0, maxWidth: "0px" },
    enter: [{ maxWidth: "100px" }, { opacity: 1 }],
    leave: fadeOut,
  });

  useListenServerEvent(SERVER_EVENT_NAME.TakeSpell, (spell: SpellInfo) => {
    const { duration, target } = spell;

    setSpells((list) =>
      produce(list, (draft) => {
        if (target === id && (duration > 0 || duration === -1 || draft[spell.id])) draft[spell.id] = spell;
      })
    );
  });

  useListenServerEvent(SERVER_EVENT_NAME.ActivatePassive, (passive: PassiveAction) => {
    const { target } = passive;
    setSpells((list) =>
      produce(list, (draft) => {
        if (target === id && draft[passive.id]) draft[passive.id].power = 0;
      })
    );
  });

  useListenServerEvent(SERVER_EVENT_NAME.NewTurn, () =>
    setSpells((list) =>
      produce(list, (draft) => {
        for (const id in draft) if (draft[id].duration === 0 || draft[id].power === 0) delete draft[id];
      })
    )
  );

  return (
    <div css={spellsStyle(align)}>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <SpellIndicator {...item} />
        </animated.div>
      ))}
    </div>
  );
};

export default memo(Spells);
