import Carousel, { CarouselItem } from "../../../../components/Carousel";
import Dialog from "../../../../components/Dialog";
import Icon from "../../../../components/Icon";
import useShowDialog from "../../../../hooks/useShowDialog";
import ChargerTutorial from "./ChargerTutorial";
import CardTutorial from "./CardTutorial";
import OverchargedTutorial from "./OverchargedTutorial";
import HitPointTutorial from "./HitPointTutorial";
import SpellTutorial from "./SpellTutorial";
import SpellDictionary from "./SpellDictionary";
import Conclusion from "./Conclusion";
import { useAtom } from "jotai";
import { languageAtom } from "../../../../atoms";
import { clickableIconStyle } from "../../../../styles";

const Tutorial = (): JSX.Element => {
  const [shouldDialogShow, dialogAction] = useShowDialog();
  const [language] = useAtom(languageAtom);

  return (
    <>
      <Icon name="book" css={clickableIconStyle} onClick={dialogAction.reveal} />
      <Dialog show={shouldDialogShow} title={language.tutorialTitle} onYes={dialogAction.hide}>
        <Carousel>
          <CarouselItem>
            <CardTutorial />
          </CarouselItem>
          <CarouselItem>
            <SpellTutorial />
          </CarouselItem>
          <CarouselItem>
            <SpellDictionary />
          </CarouselItem>
          <CarouselItem>
            <ChargerTutorial />
          </CarouselItem>
          <CarouselItem>
            <OverchargedTutorial />
          </CarouselItem>
          <CarouselItem>
            <HitPointTutorial />
          </CarouselItem>
          <CarouselItem>
            <Conclusion />
          </CarouselItem>
        </Carousel>
      </Dialog>
    </>
  );
};

export default Tutorial;
