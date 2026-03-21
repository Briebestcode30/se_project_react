import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
import likeButton from "../../assets/night/Like button.svg";
import likeButtonDark from "../../assets/night/Like button dark.svg";

export default function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    if (onCardClick) onCardClick(item);
  };

  const isLiked =
    currentUser && item.likes?.some((id) => id === currentUser._id);

  const handleLike = () => {
    if (!currentUser || !onCardLike) return;
    onCardLike(item, !isLiked);
  };

  return (
    <div className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
      {currentUser && (
        <button
          type="button"
          className="card__like-btn"
          onClick={handleLike}
          aria-label="Like item"
        >
          <img
            src={isLiked ? likeButtonDark : likeButton}
            alt={isLiked ? "Liked" : "Like"}
          />
        </button>
      )}
    </div>
  );
}
