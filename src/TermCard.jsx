
import { Fragment } from "react";
import "./TermCard.css";

export const TermCard = ({ title, description, onDelete, id }) => {
    const handleDeleteClick = () => {
        // console.log("Удалить")
        onDelete(id)
    }
    // Возвращаем JSX‑разметку, которая будет отрендерена (финализирует в изображение) при вызове компонента.
    return (
     // Карточка термина состоит из самого термина и его описания
     // Основной контейнер карточки (блочный элемент).
     // В React каждый компонент должен возвращать один корневой элемент <div> (все остальные теги вкладываются внутрь него).
     <div className="term-card"> 
        <h2  className="term-card__title">{title}</h2>
         {/* Если description существует, то есть он не андэфаинед и не пустая строка, то возвращается тег «Р» и вставляется в вёрстку. 
         В противном случае возвращается нал, который в дом не попадёт  */}
         {/* {description ? (
        <p className="term-card__description">{description}</p>
         ) : null}  */}
        {/* Или можно написать более лаконично: */}
         {description && (
        <p className="term-card__description">{description}</p>
         )}
         <button
          type="button"
           className="term-card_delete"
           onClick={handleDeleteClick}>
            Удалить
            </button> 
    </div>

    );
};

