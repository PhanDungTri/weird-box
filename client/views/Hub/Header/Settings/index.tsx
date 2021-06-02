import { useAtom } from "jotai";
import { useEffect } from "react";
import { musicAtom, audioSettingsAtom, soundAtom, chosenLanguageAtom, languageAtom } from "../../../../atoms";
import useShowDialog from "../../../../hooks/useShowDialog";
import CenterizedGrid from "../../../../components/CenterizedGrid";
import Dialog from "../../../../components/Dialog";
import H1 from "../../../../components/H1";
import Icon from "../../../../components/Icon";
import { PartialSettings, optionStyle, toggleStyle } from "./styles";

const Settings = (): JSX.Element => {
  const [shouldDialogShow, dialogAction] = useShowDialog();
  const [sound] = useAtom(soundAtom);
  const [music] = useAtom(musicAtom);
  const [, chooseLanguage] = useAtom(chosenLanguageAtom);
  const [language] = useAtom(languageAtom);
  const [settings, setSettings] = useAtom(audioSettingsAtom);

  const toggleSound = () => setSettings({ ...settings, sound: !settings.sound });
  const toggleMusic = () => setSettings({ ...settings, music: !settings.music });

  useEffect(() => {
    sound?.play("Accept");
    sound?.mute(!settings.sound);
    music?.mute(!settings.music);
  }, [settings]);

  return (
    <>
      <Icon name="cog" onClick={dialogAction.reveal} css={{ cursor: "pointer", position: "relative" }} />
      <Dialog show={shouldDialogShow} title={language.settingsTitle} onYes={dialogAction.hide}>
        <CenterizedGrid>
          <PartialSettings>
            <H1>{language.audio}</H1>
            <Icon name="sound" onClick={toggleSound} css={[!settings.sound && toggleStyle, optionStyle]} />
            <Icon name="music" onClick={toggleMusic} css={[!settings.music && toggleStyle, optionStyle]} />
          </PartialSettings>
          <PartialSettings>
            <H1>{language.language}</H1>
            <Icon name="vnFlag" onClick={() => chooseLanguage("vi")} css={optionStyle} />
            <Icon name="usFlag" onClick={() => chooseLanguage("en")} css={optionStyle} />
          </PartialSettings>
        </CenterizedGrid>
      </Dialog>
    </>
  );
};

export default Settings;
