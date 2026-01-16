import { Fragment } from "react";
import "./TermCard.css";

export const TermCard = ({ title, description, image, onDelete, id }) => {
  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <div className="term-card">
      {/* Отображение изображения вверху карточки */}
      {image && (
        <div className="term-card__image-container">
          <img
            src={image}
            alt={`Изображение к термину "${title}"`}
            className="term-card__image"
          />
        </div>
      )}

      <h2 className="term-card__title">{title}</h2>
      {description && (
        <p className="term-card__description">{description}</p>
      )}
      <button
        type="button"
        className="term-card_delete"
        onClick={handleDeleteClick}
      >
        Удалить
      </button>
    </div>
  );
};
