import EFFECT_NAME from "../../../../shared/src/effectName";
import Game from "../Game";
import Effect from "./Effect";
import PunchEffect from "./PunchEffect";
import VoidEffect from "./VoidEffect";

const createEffect = (name: EFFECT_NAME, game: Game): Effect => {
  switch (name) {
    case EFFECT_NAME.Punch:
      return new PunchEffect(game);
    default:
      return new VoidEffect(game);
  }
};

export default createEffect;
