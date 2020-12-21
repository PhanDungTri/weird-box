import EFFECT_NAME from "../../../../shared/src/effectName";
import Effect from "./Effect";
import PunchEffect from "./PunchEffect";
import VoidEffect from "./VoidEffect";

const createEffect = (name: EFFECT_NAME): Effect => {
  switch (name) {
    case EFFECT_NAME.Punch:
      return new PunchEffect();
    default:
      return new VoidEffect();
  }
};

export default createEffect;
