import { ReactNode } from "react";
import { createPortal } from "react-dom";
import COLOR from "../../constants/COLOR";
import { shadeColor } from "../../utils/color";
import Button from "../Button";
import { dialogContentStyle, dialogFooterStyle, dialogHeaderStyle, dialogStyle, showDialogStyle } from "./styles";

type DialogProps = {
  color?: string;
  title?: string;
  children?: ReactNode;
  show?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmMessage?: string;
};

const Dialog = ({
  show = false,
  color = COLOR.Coal,
  title,
  children,
  onConfirm,
  onCancel,
  confirmMessage = "OK",
}: DialogProps): JSX.Element => {
  return createPortal(
    <div css={[dialogStyle, show && showDialogStyle]}>
      <div css={dialogContentStyle(shadeColor(color, 70))}>
        {title && <div css={dialogHeaderStyle(color)}>{title}</div>}
        {children}
        <div css={dialogFooterStyle}>
          <Button variation="Safe" onClick={onConfirm}>
            {confirmMessage}
          </Button>
          {onCancel && (
            <Button variation="Danger" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("dialog") as HTMLDivElement
  );
};

export default Dialog;
