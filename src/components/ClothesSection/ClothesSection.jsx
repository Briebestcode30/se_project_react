import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({ clothingItems, onCardClick }) {
  return (
    <div className="Clothes-Section">
      <div className="clothes-section__row">
        <p className="clothes-section__text">Your items</p>

        <button className="clothes-section__button">+Add new</button>
      </div>

      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <li key={item._id} className="clothes-section__item">
            <ItemCard item={item} onCardClick={onCardClick} />
          </li>
        ))}
      </ul>
    </div>
  );
}
