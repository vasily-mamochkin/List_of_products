import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FormPage } from './FormPage';
import { TermsPage } from './TermsPage';
// Импортируем функции для работы с терминами
import { addTerm, deleteItem, terms } from './main';

export const App = () => {
  return (
    <Router>
      {/* Навигация между страницами */}
      <nav className="navigation">
        <Link to="/" className="nav-link">Форма</Link>
        <Link to="/terms" className="nav-link">Термины</Link>
      </nav>

      {/* Определение маршрутов приложения */}
      <Routes>
        {/* Страница формы добавления терминов */}
        <Route
          path="/"
          element={<FormPage onAdd={addTerm} />}
        />
        {/* Страница отображения терминов */}
        <Route
          path="/terms"
          element={<TermsPage terms={terms} onDelete={deleteItem} />}
        />
      </Routes>
    </Router>
  );
};
