import { css } from "@emotion/react";
import { gridStyle } from "../../../styles";
import HitPointBar from "./HitPointBar";
import Spells from "./Spells";
import { horizontalStatusStyle } from "./styles";
import Timer from "./Timer";

type StatusProps = {
  id: string;
  horizontal?: boolean;
};

const Status = ({ id, horizontal = false }: StatusProps): JSX.Element => {
  return (
    <div
      css={[
        gridStyle,
        css`
          grid-template-rows: 32px 32px 16px;
        `,
        horizontal && horizontalStatusStyle,
      ]}
    >
      <HitPointBar id={id} />
      <Spells id={id} align={horizontal ? "left" : "center"} />
      <Timer id={id} fluid={horizontal} />
    </div>
  );
};

export default Status;
