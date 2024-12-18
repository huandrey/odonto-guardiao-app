import { HeaderRoot } from "..";
import BackButton from "./back-button";
import Logo from "./header-logo";
import Title from "./header-title";
import MenuButton from "./menu-button";
import NotificationsButton from "./notifications-button";
import { Center, Left, Right } from "./positions";

export const Header = Object.assign(HeaderRoot, {
  Left,
  Center,
  Right,
  Logo,
  Title,
  BackButton,
  MenuButton,
  NotificationsButton,
});
