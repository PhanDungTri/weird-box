import { css } from "@emotion/react";
import { useState } from "react";
import { SERVER_EVENT_NAME } from "../../../../../../shared/constants";
import Charger from "../../../../../components/Charger";
import { useListenServerEvent } from "../../../../../hooks";
import { bouncingKeyframes, chargePointBarStyle } from "./styles";

const ChargePointBar = (): JSX.Element => {
  const [chargePoint, setChargePoint] = useState(0);
  const [shouldAnimate, animate] = useState(false);

  const stopAnimation = () => animate(false);

  useListenServerEvent(SERVER_EVENT_NAME.ChargePointChanged, (point: number) => setChargePoint(point));
  useListenServerEvent(SERVER_EVENT_NAME.GetCards, () => animate(true));

  return (
    <Charger
      point={chargePoint}
      max={10}
      css={[
        chargePointBarStyle,
        shouldAnimate &&
          css`
            animation: ${bouncingKeyframes} ${10 / 12}s steps(1);
          `,
      ]}
      onAnimationEnd={stopAnimation}
    />
  );
};

export default ChargePointBar;
