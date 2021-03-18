import { memo } from "react";
import { animated, useTransition } from "react-spring";
import { SpellInfo } from "../../../../../../shared/src/@types";
import { fadeOut } from "../../../../styles/animations";
import SpellIndicator from "./SpellIndicator";
import { spellsStyle } from "./styles";

type SpellsProps = {
  spells: SpellInfo[];
  align?: "center" | "left";
};

const Spells = ({ spells, align = "center" }: SpellsProps): JSX.Element => {
  const transitions = useTransition(spells, (s) => s.id, {
    from: { opacity: 0, maxWidth: "0px" },
    enter: [{ maxWidth: "100px" }, { opacity: 1 }],
    leave: fadeOut,
  });

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
