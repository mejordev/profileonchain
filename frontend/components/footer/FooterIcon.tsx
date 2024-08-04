
import { IconType } from "react-icons/lib";

type IconAttributes = {
  icon: IconType;
  title: string;
  link: string;
};
type FooterIconProps = {
  iconData: IconAttributes;
};

const iconsStyle =
  "text-gray-300 hover:scale-110 hover:text-white duration-300 cursor-pointer w-6 h-6";

const FooterIcon = ({ iconData }: FooterIconProps) => {
  return <>{<iconData.icon className={iconsStyle} />}</>;
};

export default FooterIcon;
