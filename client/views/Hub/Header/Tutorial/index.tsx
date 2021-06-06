import { useAtom } from "jotai";
import { languageAtom } from "../../../../atoms";
import Carousel, { CarouselItem } from "../../../../components/Carousel";
import Dialog from "../../../../components/Dialog";
import Icon from "../../../../components/Icon";
import { useLocalStorage } from "../../../../hooks";
import useShowDialog from "../../../../hooks/useShowDialog";
import { clickableIconStyle } from "../../../../styles";
import GameplayTutorial from "./GameplayTutorial";
import SpellDictionary from "./SpellDictionary";

const Tutorial = (): JSX.Element => {
  const [shouldShowOnLoad, showOnLoad] = useLocalStorage("showOnLoad", 1);
  const [shouldDialogShow, dialogAction] = useShowDialog(!!shouldShowOnLoad);
  const [language] = useAtom(languageAtom);

  const close = () => {
    dialogAction.hide();
    showOnLoad(0);
  };

  return (
    <>
      <Icon name="book" css={clickableIconStyle} onClick={dialogAction.reveal} />
      <Dialog show={shouldDialogShow} title={language.tutorialTitle} onYes={close}>
        <Carousel>
          <CarouselItem>
            <GameplayTutorial />
          </CarouselItem>
          <CarouselItem>
            <SpellDictionary />
          </CarouselItem>
        </Carousel>
      </Dialog>
    </>
  );
};

export default Tutorial;
