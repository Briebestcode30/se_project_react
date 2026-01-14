import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../../components/SideBar/SideBar";
export default function Profile({ clothingItems, onCardClick }) {
  return (
    <section className="Profile">
      <SideBar />
      <ClothesSection onCardClick={onCardClick} clothingItems={clothingItems} />
    </section>
  );
}
