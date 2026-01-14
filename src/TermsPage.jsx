import { TermList } from './TermList';
import './TermsPage.css';

export const TermsPage = ({ terms, onDelete }) => {
  return (
    <div className="terms-page">
      <h1 className="dictionary-app__header">Словарь терминов</h1>
      <div id="description-list">
        <TermList terms={terms} onDelete={onDelete} />
      </div>
    </div>
  );
};
