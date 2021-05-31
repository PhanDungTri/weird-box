import produce from "immer";
import { memo, useState } from "react";
import { animated, useTransition } from "react-spring";
import { PassiveAction, SpellInfo } from "../../../../../shared/@types";
import { SERVER_EVENT_NAME } from "../../../../../shared/constants";
import { useListenServerEvent } from "../../../../hooks";
import { fadeOut } from "../../../../styles";
import SpellIndicator from "./SpellIndicator";
import { StyledSpells } from "./styles";

type SpellsProps = {
  id: string;
  justifyContent?: "center" | "left";
};

const Spells = ({ id, justifyContent = "center" }: SpellsProps): JSX.Element => {
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
    <StyledSpells css={{ justifyContent }}>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <SpellIndicator {...item} />
        </animated.div>
      ))}
    </StyledSpells>
  );
};

export default memo(Spells);
