import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../../components/SideBar/SideBar";

export default function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  setActiveModal,
  onSignOut,
  onCardLike,
}) {
  return (
    <section className="Profile">
      {" "}
      <SideBar />
      <div className="Profile__buttons">
        <button
          className="Profile__edit-btn"
          onClick={() => setActiveModal("edit-profile")}
        >
          Edit profile
        </button>

        <button className="Profile__signout-btn" onClick={onSignOut}>
          Sign out
        </button>
      </div>
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
