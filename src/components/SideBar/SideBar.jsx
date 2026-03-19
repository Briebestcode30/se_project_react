import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import defaultAvatar from "../../assets/avatar.svg";

export default function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const username = currentUser?.name || "User";
  const avatar = currentUser?.avatar || defaultAvatar;

  return (
    <aside className="sidebar">
      {" "}
      <div className="sidebar__user-container"> </div>
      <div className="sidebar__actions"></div>
    </aside>
  );
}
