import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

export default function SideBar() {
  const username = "Terrence Tegegne";

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">{username}</p>
        <img src={avatar} alt={username} className="sidebar__avatar" />
      </div>
    </aside>
  );
}
