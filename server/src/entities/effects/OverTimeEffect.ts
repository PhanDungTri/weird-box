import EFFECT_NAME from "../../../../shared/src/effectName";
import { IEffect } from "../../../../shared/src/interfaces/Effect";
import Player from "../Player";
import Effect from "./Effect";

abstract class OverTimeEffect extends Effect {
  constructor(name: EFFECT_NAME, protected target: Player, protected duration: number) {
    super(name);
  }

  public abstract tick(): void;

  public getDuration(): number {
    return this.duration;
  }

  public toJsonData(): IEffect {
    return {
      ...super.toJsonData(),
      duration: this.duration,
    };
  }
}

export default OverTimeEffect;
