import React from "react";
import HitPointBar from "./HitPointBar";
import Spells from "./Spells";
import Timer from "./Timer";
import "./Status.scss";

type StatusProps = {
  id: string;
  horizontal?: boolean;
};

const Status = ({ id, horizontal = false }: StatusProps): JSX.Element => {
  return (
    <div className={`status ${horizontal ? "-horizontal" : ""}`}>
      <HitPointBar id={id} />
      <Spells id={id} align={horizontal ? "left" : "center"} />
      <Timer id={id} fluid={horizontal} />
    </div>
  );
};

export default Status;
