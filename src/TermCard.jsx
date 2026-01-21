// import { Fragment } from "react";
// import "./TermCard.css";

// export const TermCard = ({ title, description, discount, image, onDelete, id }) => {
//   const handleDeleteClick = () => {
//     onDelete(id);
//   };

//   const hasDiscount = typeof discount === 'number' && discount > 0;

//   return (
//     <div className="term-card">
//       {/* Отображение изображения вверху карточки */}
//       {image && (
//         <div className="term-card__image-container">
//           <img
//             src={image}
//             alt={`Изображение к термину "${title}"`}
//             className="term-card__image"
//           />
//         </div>
//       )}

//       <h2 className="term-card__title">{title}</h2>
//       <div className="term-card__content">
//         {description && (
//           <p className="term-card__description">{description}</p>
//         )}
//         {hasDiscount && (
//           <span className="term-card__discount">
//             <span className="discount-value">{discount}Р</span>
//           </span>
//         )}
//       </div>

//       {/* Обёртка для кнопки удаления */}
//       <div className="term-card__actions">
//         <button
//           type="button"
//           className="term-card_delete"
//           onClick={handleDeleteClick}
//         >
//           Удалить
//         </button>
//       </div>
//     </div>
//   );
// };

// -------------------------------------------------------------------------------------
import { Fragment } from "react";
import "./TermCard.css";

export const TermCard = ({ title, description, discount, image, onDelete, id }) => {
  const handleDeleteClick = () => {
    onDelete(id);
  };

  const hasDiscount = typeof discount === 'number' && discount > 0;

  return (
    <div className="term-card">
      {/* Контейнер для изображения на всю ширину */}
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
      <div className="term-card__content">
        {description && (
          <p className="term-card__description">{description}</p>
        )}
        {hasDiscount && (
          <span className="term-card__discount">
            Скидка: <span className="discount-value">{discount}%</span>
          </span>
        )}
      </div>

      <div className="term-card__actions">
        <button
          type="button"
          className="term-card_delete"
          onClick={handleDeleteClick}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};
