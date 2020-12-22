import EFFECT_NAME from "../../../../shared/src/effectName";
import Game from "../Game";
import Player from "../Player";

abstract class Effect {
  protected power = -1;

  constructor(public readonly name: EFFECT_NAME, protected game: Game, protected source: Player) {}

  public getPower(): number {
    return this.power;
  }

  public abstract execute(): void;
}

export default Effect;
