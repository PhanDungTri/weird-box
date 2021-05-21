import { css, SerializedStyles } from "@emotion/react";
import { NotificationVariant } from "../../../../shared/@types";
import { COLOR } from "../../../constants";
import { shadeColor } from "../../../utils";

export const integrateButtonStyle = (variation: NotificationVariant): SerializedStyles => {
  const borderColor = shadeColor(COLOR[variation], 70);

  return css`
    box-shadow: -1px 1px 0px 1px ${borderColor}, 2px 0px ${borderColor}, -1px -1px 0px 1px ${borderColor};
    margin: 2px 2px 2px 0px;
    padding: 2px;
  `;
};

export const integrateInputStyle = (variation: NotificationVariant): SerializedStyles => {
  const borderColor = shadeColor(COLOR[variation], 70);

  return css`
    box-shadow: 1px 1px 0px 1px ${borderColor}, -2px 0px ${borderColor}, 1px -1px 0px 1px ${borderColor};
    border: none;
    margin: 2px 0px 2px 2px;
    flex-grow: 1;
    padding: 2px;
    cursor: text;
  `;
};
