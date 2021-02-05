import React from "react";
import SPELL_NAME from "../../../../shared/src/SpellName";
import SpellTracker from "../../components/SpellList/SpellTracker";

const Test = (): JSX.Element => {
  return (
    <div>
      <SpellTracker id="abc" name={SPELL_NAME.Poison} duration={5} />
    </div>
  );
};

export default Test;
