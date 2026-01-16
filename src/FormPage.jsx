import { useState } from 'react';
import './FormPage.css';

export const FormPage = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Создаём объект с данными термина, включая изображение
    const termData = {
      title,
      description,
      image: imagePreview // сохраняем base64-строку изображения
    };

    if (onAdd(termData)) {
      // Сброс формы после успешного добавления
      setTitle('');
      setDescription('');
      setImage(null);
      setImagePreview('');
    }
  };

  // Обработчик выбора изображения
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // Создаём предварительный просмотр изображения
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
