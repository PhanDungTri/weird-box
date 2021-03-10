import { NotificationProps } from "../../@types";
import COLOR from "../../constants/COLOR";
import { notificationStyle } from "./styles";

const Notification = ({ message, variant, ...props }: NotificationProps & { className?: string }): JSX.Element => {
  return (
    <div css={notificationStyle(COLOR[variant])} {...props}>
      {message}
    </div>
  );
};

export default Notification;
