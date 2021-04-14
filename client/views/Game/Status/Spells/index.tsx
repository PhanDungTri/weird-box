import produce from "immer";
import { memo, useEffect, useState } from "react";
import { animated, useTransition } from "react-spring";
import { SERVER_EVENT_NAME, SpellInfo } from "../../../../../shared/@types";
import socket from "../../../../services/socket";
import { fadeOut } from "../../../../styles/animations";
import SpellIndicator from "./SpellIndicator";
import { spellsStyle } from "./styles";

type SpellsProps = {
  id: string;
  align?: "center" | "left";
};

const CLEAN_UP_TIMEOUT = 400;

const Spells = ({ id, align = "center" }: SpellsProps): JSX.Element => {
  const [spells, setSpells] = useState<Record<string, SpellInfo>>({});
  const transitions = useTransition(Object.values(spells), (s) => s.id, {
    from: { opacity: 0, maxWidth: "0px" },
    enter: [{ maxWidth: "100px" }, { opacity: 1 }],
    leave: fadeOut,
  });

  useEffect(() => {
    const cleanup = setTimeout(
      () =>
        setSpells(
          produce(spells, (draft) => {
            for (const id in draft) if (draft[id].duration === 0 || draft[id].power === 0) delete draft[id];
          })
        ),
      CLEAN_UP_TIMEOUT
    );

    return () => clearTimeout(cleanup);
  }, [spells]);

  useEffect(() => {
    const onTakeSpell = (spell: SpellInfo) => {
      const { duration, target } = spell;

      setSpells((list) =>
        produce(list, (draft) => {
          if (target === id && (duration > 0 || duration === -1 || draft[spell.id])) draft[spell.id] = spell;
        })
      );
    };

    socket.on(SERVER_EVENT_NAME.TakeSpell, onTakeSpell);

    return () => void socket.off(SERVER_EVENT_NAME.TakeSpell, onTakeSpell);
  }, []);

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
