import { css } from "@emotion/react";
import produce from "immer";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { PassiveActionInfo } from "../../../../../shared/@types";
import { SERVER_EVENT_NAME } from "../../../../../shared/constants";
import { languageAtom } from "../../../../atoms";
import { useListenServerEvent } from "../../../../hooks";
import SpellIndicator from "../../Status/Spells/SpellIndicator";
import { StyledSpellAction } from "./styled";

const SpellAction = (): JSX.Element => {
  const [actions, setActions] = useState<PassiveActionInfo[]>([]);
  const [shouldShow, show] = useState(false);
  const [language] = useAtom(languageAtom);

  useListenServerEvent(SERVER_EVENT_NAME.ActivatePassive, (passive: PassiveActionInfo) => {
    setActions((list) =>
      produce(list, (draft) => {
        if (draft.length >= 3) draft.shift();
        draft.push(passive);
      })
    );
    show(true);
  });

  useEffect(() => {
    if (shouldShow) {
      const timeout = window.setTimeout(() => show(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [shouldShow]);

  return (
    <StyledSpellAction
      css={css`
        opacity: ${shouldShow ? 1 : 0};
      `}
      onTransitionEnd={() => {
        if (!shouldShow) setActions([]);
      }}
    >
      {actions.map((a) => (
        <div key={a.id}>
          <SpellIndicator
            css={css`
              display: inline-block;
            `}
            strength={a.attacker.strength}
            name={a.attacker.spell}
          />{" "}
          {language.of} {a.attacker.name} {language[a.message]}{" "}
          <SpellIndicator
            css={css`
              display: inline-block;
            `}
            strength={a.defender.strength}
            name={a.defender.spell}
          />{" "}
          {language.of} {a.defender.name}
        </div>
      ))}
    </StyledSpellAction>
  );
};

export default SpellAction;
