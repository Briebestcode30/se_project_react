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
      <SideBar
        onEditProfile={() => setActiveModal("edit-profile")}
        onSignOut={onSignOut}
      />

      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
