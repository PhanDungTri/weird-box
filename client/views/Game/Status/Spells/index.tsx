import produce from "immer";
import { memo, useEffect, useState } from "react";
import { animated, useTransition } from "react-spring";
import { SERVER_EVENT_NAME, SpellInfo } from "../../../../../shared/@types";
import socket from "../../../../services/socket";
import { fadeOut } from "../../../../styles/animations";
import SpellIndicator from "./SpellIndicator";
import { spellsStyle } from "./styles";

type SpellsProps = {
  align?: "center" | "left";
};

const Spells = ({ align = "center" }: SpellsProps): JSX.Element => {
  const [spells, setSpells] = useState<Record<string, SpellInfo>>({});
  const transitions = useTransition(Object.values(spells), (s) => s.id, {
    from: { opacity: 0, maxWidth: "0px" },
    enter: [{ maxWidth: "100px" }, { opacity: 1 }],
    leave: fadeOut,
  });

  useEffect(() => {
    let cleanup: number;

    const updateSpell = (spell: SpellInfo) =>
      setSpells((list) =>
        produce(list, (draft) => {
          draft[spell.id] = spell;
        })
      );

    const onTakeSpell = (spell: SpellInfo) => {
      const { id, duration } = spell;
      if (duration === 0 && spells[id]) {
        updateSpell(spell);
        cleanup = window.setTimeout(
          () =>
            void setSpells((list) =>
              produce(list, (draft) => {
                delete draft[id];
              })
            ),
          400
        );
      } else if (duration > 0 || duration === -1) updateSpell(spell);
    };

    socket.on(SERVER_EVENT_NAME.TakeSpell, onTakeSpell);

    return () => {
      socket.off(SERVER_EVENT_NAME.TakeSpell, onTakeSpell);
      clearTimeout(cleanup);
    };
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
