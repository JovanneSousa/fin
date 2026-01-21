import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faBabyCarriage,
  faBagShopping,
  faBarcode,
  faBone,
  faBook,
  faBookBookmark,
  faBriefcase,
  faBuildingColumns,
  faBus,
  faCakeCandles,
  faCalculator,
  faCamera,
  faCapsules,
  faCar,
  faCartShopping,
  faEllipsis,
  faGift,
  faMoneyBill1Wave,
  faPersonBiking,
  faPlaneUp,
  faShirt,
  faStar,
  faUmbrellaBeach,
  faUtensils,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import { BackgroundIcon } from "./styles";

export type IconType = keyof typeof tipos;

interface IconeProps {
  tipoIcone: IconType;
  background?: string;
  onClick?: () => void;
  className?: string;
}

const tipos = {
  faCar: <FontAwesomeIcon icon={faCar} />,
  faShirt: <FontAwesomeIcon icon={faShirt} />,
  faUtensils: <FontAwesomeIcon icon={faUtensils} />,
  faCapsules: <FontAwesomeIcon icon={faCapsules} />,
  faHouse: <FontAwesomeIcon icon={faHouse} />,
  faBook: <FontAwesomeIcon icon={faBook} />,
  faGift: <FontAwesomeIcon icon={faGift} />,
  faMoneyBill1Wave: <FontAwesomeIcon icon={faMoneyBill1Wave} />,
  faArrowTrendUp: <FontAwesomeIcon icon={faArrowTrendUp} />,
  faStar: <FontAwesomeIcon icon={faStar} />,
  faBarCode: <FontAwesomeIcon icon={faBarcode} />,
  faUmbrellaBeach: <FontAwesomeIcon icon={faUmbrellaBeach} />,
  faPlaneUp: <FontAwesomeIcon icon={faPlaneUp} />,
  faBuildingColumns: <FontAwesomeIcon icon={faBuildingColumns} />,
  faBagShopping: <FontAwesomeIcon icon={faBagShopping} />,
  faBabyCarriage: <FontAwesomeIcon icon={faBabyCarriage} />,
  faEllipsis: <FontAwesomeIcon icon={faEllipsis} />,
  faPersonBiking: <FontAwesomeIcon icon={faPersonBiking} />,
  faBone: <FontAwesomeIcon icon={faBone} />,
  faBookBookmark: <FontAwesomeIcon icon={faBookBookmark} />,
  faCakeCandles: <FontAwesomeIcon icon={faCakeCandles} />,
  faBus: <FontAwesomeIcon icon={faBus} />,
  faBriefCase: <FontAwesomeIcon icon={faBriefcase} />,
  faVideo: <FontAwesomeIcon icon={faVideo} />,
  faCamera: <FontAwesomeIcon icon={faCamera} />,
  faCartShopping: <FontAwesomeIcon icon={faCartShopping} />,
  faCalculator: <FontAwesomeIcon icon={faCalculator} />,
  null: "Sem ícone",
};

const Icone = ({ tipoIcone, background, onClick, className }: IconeProps) => {
  return (
    <BackgroundIcon
      onClick={onClick}
      background={background}
      className={className}
    >
      {tipos[tipoIcone]}
    </BackgroundIcon>
  );
};

export default Icone;
