import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Filter items that belong to the current user
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id,
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__text">Your items</p>
        <button
          type="button"
          className="clothes-section__button"
          onClick={onAddClick}
        >
          + Add new
        </button>
      </div>

      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <li key={item._id} className="clothes-section__item">
            <ItemCard
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
