import EFFECT_NAME from "../../../../shared/src/effectName";
import Game from "../Game";
import Player from "../Player";
import Effect from "./Effect";
import PunchEffect from "./PunchEffect";
import VoidEffect from "./VoidEffect";

const createEffect = (name: EFFECT_NAME, game: Game, source: Player): Effect => {
  switch (name) {
    case EFFECT_NAME.Punch:
      return new PunchEffect(game, source);
    default:
      return new VoidEffect(game, source);
  }
};

export default createEffect;
