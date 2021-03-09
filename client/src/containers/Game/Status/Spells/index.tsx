import { useEffect, useState } from "react";
import { Transition, TransitionGroup } from "react-transition-group";
import { SOCKET_EVENT } from "../../../../../../shared/src/@enums";
import { PassiveAction, SpellInfo } from "../../../../../../shared/src/@types";
import socket from "../../../../services/socket";
import SpellIndicator from "./SpellIndicator";
import { spellsStyle, spellTransition } from "./styles";

type SpellsProps = {
  id: string;
  align?: "center" | "left";
};

const cleanUpSpells = (spells: Record<string, SpellInfo>): typeof spells => {
  const result: typeof spells = {};
  for (const id in spells) if (spells[id].duration !== 0 && spells[id].power > 0) result[id] = spells[id];
  return result;
};

const Spells = ({ id, align = "center" }: SpellsProps): JSX.Element => {
  const [spells, setSpells] = useState<Record<string, SpellInfo>>({});

  useEffect(() => {
    let cleanUpTimeout: number;

    socket.on(SOCKET_EVENT.TakeSpell, (spell: SpellInfo) => {
      if (spell.target === id) {
        setSpells((list) =>
          spell.duration > 0 || spell.duration === -1 || list[spell.id] ? { ...list, [spell.id]: spell } : list
        );
        cleanUpTimeout = setTimeout(() => setSpells((list) => cleanUpSpells(list)), 400);
      }
    });

    socket.on(SOCKET_EVENT.ActivatePassive, (payload: PassiveAction) => {
      if (payload.target === id) {
        setSpells((list) => ({ ...list, [payload.id]: { ...list[payload.id], power: 0 } }));
        cleanUpTimeout = setTimeout(() => setSpells((list) => cleanUpSpells(list)), 400);
      }
    });

    return () => {
      socket.off(SOCKET_EVENT.TakeSpell);
      clearTimeout(cleanUpTimeout);
    };
  }, []);

  return (
    <TransitionGroup css={[spellsStyle(align)]}>
      {Object.values(spells).map((s) => (
        <Transition timeout={400} key={s.id}>
          {(state) => (
            <div css={spellTransition(state)}>
              <SpellIndicator {...s} />
            </div>
          )}
        </Transition>
      ))}
    </TransitionGroup>
  );
};

export default Spells;
