import React from "react";
import Sprite from "../../Sprite";
import "./EffectTracker.scss";
import PoisonSprite from "../../../assets/sprites/poison.png";

interface EffectTrackerProps {
  id: string;
}

const EffectTracker = (props: EffectTrackerProps): JSX.Element => {
  return (
    <div className="effect-tracker">
      <Sprite src={PoisonSprite} size={[24, 24]} centerize />
    </div>
  );
};

export default EffectTracker;
