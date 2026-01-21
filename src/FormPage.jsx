import { useState } from 'react';
import './FormPage.css';

export const FormPage = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState(''); // Новое состояние для скидки
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Создаём объект с данными термина, включая скидку
    const termData = {
      title,
      description,
      discount: discount ? parseFloat(discount) : null, // Сохраняем как число или null
      image: imagePreview
    };

    if (onAdd(termData)) {
      // Сброс формы после успешного добавления
      setTitle('');
      setDescription('');
      setDiscount(''); // Сброс поля скидки
      setImage(null);
      setImagePreview('');
    }
  };

  // Обработчик выбора изображения (остаётся без изменений)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-page">
      <h1 className="dictionary-app__header">Словарь</h1>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Новый термин</h2>

        <label className="form-field">
          <span className="form-field__label">Термин</span>
          <input
            className="form-field__input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label className="form-field">
          <span className="form-field__label">Значение</span>
          <input
            className="form-field__input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        {/* НОВОЕ ПОЛЕ: Скидка */}
        <label className="form-field">
          <span className="form-field__label">Цена до скидки</span>
          <input
            className="form-field__input"
            type="number"
            min="0"
            max="100"
            step="0.1"
            placeholder="Например: 15"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </label>

        <label className="form-field">
          <span className="form-field__label">Изображение</span>
          <input
            className="form-field__input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        {/* Предварительный просмотр выбранного изображения */}
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Предварительный просмотр" className="preview-image" />
          </div>
        )}

        <button className="form-button" type="submit">Запомнить</button>
      </form>
    </div>
  );
};
