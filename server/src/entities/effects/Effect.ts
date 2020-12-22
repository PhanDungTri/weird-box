import EFFECT_NAME from "../../../../shared/src/effectName";
import Game from "../Game";

abstract class Effect {
  protected power = -1;

  constructor(public readonly name: EFFECT_NAME, protected game: Game) {}

  public getPower(): number {
    return this.power;
  }

  public abstract execute(): void;
}

export default Effect;
