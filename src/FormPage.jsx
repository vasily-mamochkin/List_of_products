import { useState } from 'react';
import './FormPage.css';

export const FormPage = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAdd(title, description)) {
      setTitle('');
      setDescription('');
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

        <button className="form-button" type="submit">Запомнить</button>
      </form>
    </div>
  );
};
