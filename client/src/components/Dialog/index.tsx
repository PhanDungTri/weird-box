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
  confirmMessage?: string;
};

type NoCancelButtonDialogProps = DialogProps & { cancelMessage?: string };
type WithCancelButtonDialogProps = DialogProps & { cancelMessage: string; onCancel?: () => void };

function Dialog(props: NoCancelButtonDialogProps): JSX.Element;
function Dialog(props: WithCancelButtonDialogProps): JSX.Element;
function Dialog({
  show = false,
  color = COLOR.Coal,
  title,
  children,
  confirmMessage = "OK",
  onConfirm,
  cancelMessage,
  onCancel,
}: DialogProps & { cancelMessage?: string; onCancel?: () => void }): JSX.Element {
  return createPortal(
    <div css={[dialogStyle, show && showDialogStyle]}>
      <div css={dialogContentStyle(shadeColor(color, 70))}>
        {title && <div css={dialogHeaderStyle(color)}>{title}</div>}
        {children}
        <div css={dialogFooterStyle}>
          <Button variation="Safe" onClick={onConfirm}>
            {confirmMessage}
          </Button>
          {cancelMessage && (
            <Button variation="Danger" onClick={onCancel}>
              {cancelMessage}
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("dialog") as HTMLDivElement
  );
}

export default Dialog;
