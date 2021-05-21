import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { COLOR } from "../../constants";
import { shadeColor } from "../../utils";
import Button from "../Button";
import { dialogContentStyle, dialogFooterStyle, dialogHeaderStyle, dialogStyle, showDialogStyle } from "./styles";

type DialogProps = {
  color?: string;
  title?: string;
  children?: ReactNode;
  show?: boolean;
  onYes?: () => void;
  yesMessage?: string;
  noFooter?: boolean;
};

type NoCancelButtonDialogProps = DialogProps & { noMessage?: string };
type WithCancelButtonDialogProps = DialogProps & { noMessage: string; onNo?: () => void };

function Dialog(props: NoCancelButtonDialogProps): JSX.Element;
function Dialog(props: WithCancelButtonDialogProps): JSX.Element;
function Dialog({
  show,
  color = COLOR.Coal,
  title,
  children,
  noFooter,
  yesMessage = "OK",
  onYes,
  noMessage,
  onNo,
}: DialogProps & { noMessage?: string; onNo?: () => void }): JSX.Element {
  return createPortal(
    <div css={[dialogStyle, show && showDialogStyle]}>
      <div css={dialogContentStyle(shadeColor(color, 70))}>
        {title && <div css={dialogHeaderStyle(color)}>{title}</div>}
        {children}
        {!noFooter && (
          <div css={dialogFooterStyle}>
            <Button variation="Safe" onClick={onYes}>
              {yesMessage}
            </Button>
            {noMessage && (
              <Button variation="Danger" onClick={onNo}>
                {noMessage}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.getElementById("dialog") as HTMLDivElement
  );
}

export default Dialog;
