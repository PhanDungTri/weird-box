import { SPELL_NAME } from "../../../../shared/src/@enums";
import Card from "../Game/Card";

const Test = (): JSX.Element => {
  return (
    <div>
      <Card card={{ id: "a", power: 5, spell: SPELL_NAME.Punch }} />
    </div>
  );
};

export default Test;
