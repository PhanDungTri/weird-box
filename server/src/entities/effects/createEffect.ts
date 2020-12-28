import EFFECT_NAME from "../../../../shared/src/effectName";
import Game from "../Game";
import Player from "../Player";
import HealEffect from "./HealEffect";
import PoisonEffect from "./PoisonEffect";
import PunchEffect from "./PunchEffect";

const createPunchEffect = (game: Game, source: Player): void => {
  const effect = new PunchEffect(game.getChargePoint());

  game.getPlayers().forEach((p) => {
    if (p !== source) {
      p.takeEffect(effect);
      setTimeout(() => p.changeHitPoint(-effect.getPower()), 600);
    }
  });
};

const createHealEffect = (game: Game, source: Player): void => {
  const effect = new HealEffect(game.getChargePoint());

  source.takeEffect(effect);
  source.sanitize();
  setTimeout(() => source.changeHitPoint(effect.getPower()), 600);
};

const createPoisonEffect = (game: Game, source: Player): void => {
  game.getPlayers().forEach((p) => {
    if (p !== source) {
      const effect = new PoisonEffect(game.getChargePoint(), p);

      p.takeEffect(effect);
    }
  });
};

const createEffect = (name: EFFECT_NAME, game: Game, source: Player): void => {
  switch (name) {
    case EFFECT_NAME.Punch: {
      createPunchEffect(game, source);
      break;
    }
    case EFFECT_NAME.Heal: {
      createHealEffect(game, source);
      break;
    }
    case EFFECT_NAME.Poison: {
      createPoisonEffect(game, source);
    }
  }
};

export default createEffect;
