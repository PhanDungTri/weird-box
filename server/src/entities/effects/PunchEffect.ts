import EFFECT_NAME from "../../../../shared/src/effectName";
import Game from "../Game";
import Effect from "./Effect";

class PunchEffect extends Effect {
  constructor(game: Game) {
    super(EFFECT_NAME.Punch, game);
    this.power = -this.game.getChargePoint();
  }

  public execute(): void {
    const currentPlayer = this.game.getCurrentPlayer();
    this.game.getPlayers().forEach((p) => {
      if (p !== currentPlayer) {
        p.takeEffect(this);
      }
    });
  }
}

export default PunchEffect;
