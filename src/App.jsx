import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FormPage } from './FormPage';
import { TermsPage } from './TermsPage';

// Импортируем функции из main.jsx
import { addTerm, deleteItem, terms } from './main';

export const App = () => {
  return (
    <Router>
      <nav className="navigation">
        <Link to="/" className="nav-link">Форма</Link>
        <Link to="/terms" className="nav-link">Термины</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<FormPage onAdd={addTerm} />}
        />
        <Route
          path="/terms"
          element={<TermsPage terms={terms} onDelete={deleteItem} />}
        />
      </Routes>
    </Router>
  );
};
