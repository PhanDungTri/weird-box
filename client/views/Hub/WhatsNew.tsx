import { useAtom } from "jotai";
import ReactMarkdown from "react-markdown";
import { chosenLanguageAtom, versionAtom } from "../../atoms";
import Dialog from "../../components/Dialog";
import { useLocalStorage } from "../../hooks";
import useShowDialog from "../../hooks/useShowDialog";

const content = {
  en: {
    in: "in",
    title: "What's new",
    text: `### New:\n- Emotion are here! Introducing 4 new emotions (Bonk, Nervous, Laugh, Angry) you can use in game, only 1 emotion can be used per 5 seconds!\n- Spell log shows which spell has been blocked (or not hmmmm...).\n### Change:\n- Heal spell now also clears all debuffs (Poison spell).\n- If Shield spell is pierced, it now reduces the factor strength by 1.\n- Player name are now saved and has limited length (2 - 24).`,
  },
  vi: {
    in: "trong",
    title: "Có gì mới",
    text: `### Mới:\n- Cảm xúc đã có mặt! Ra mắt 4 cảm xúc mới (Bonk, Lắng lo, Cười, Tứk) có thể dùng trong trận đầu, bạn chỉ có thể dùng 1 cảm xúc mỗi 5 giây!\n- Nhật ký phép hiển thị thông tin phép nào bị cản (hoặc không hmmmm...).\n### Thay đổi:\n- Phép Hồi máu bây giờ sẽ huỷ toàn bộ hiệu ứng bất lợi (phép Độc).\n- Nếu phép Khiên bị xuyên phá, nó sẽ giảm 1 sức mạnh của phép tác nhân.\n- Tên người chơi đã được lưu lại và có giới hạn độ dài (2 - 24).`,
  },
};

const WhatsNew = (): JSX.Element => {
  const [clientVersion, setClientVersion] = useLocalStorage("version", "");
  const [chosenLanguage] = useAtom(chosenLanguageAtom);
  const [version] = useAtom(versionAtom);
  const [shouldShow, action] = useShowDialog(true);

  const close = () => {
    action.hide();
    setClientVersion(version);
  };

  return (
    <>
      {clientVersion !== version && (
        <Dialog
          show={shouldShow}
          title={`${content[chosenLanguage].title} ${content[chosenLanguage].in} ${version}?`}
          onYes={close}
        >
          <div>
            <ReactMarkdown>{content[chosenLanguage].text}</ReactMarkdown>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default WhatsNew;
