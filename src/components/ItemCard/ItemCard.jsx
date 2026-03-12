import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

export default function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked =
    currentUser && item.likes?.some((id) => id === currentUser._id);
  const itemLikeButtonClassName = `card__like-btn ${isLiked ? "card__like-btn_active" : ""}`;

  const handleLike = () => {
    if (!currentUser) return;
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <div className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {currentUser && (
        <button
          className={itemLikeButtonClassName}
          type="button"
          onClick={handleLike}
        >
          ❤️
        </button>
      )}
    </div>
  );
}
