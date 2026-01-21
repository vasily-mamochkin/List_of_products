// 
import './index.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';

// === НАСТРОЙКИ И ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===

const DEBUG_MODE = true;

function debugLog(message, data = null) {
  if (DEBUG_MODE) {
    console.log(`[DEBUG] ${message}`, data || '');
  }
}

// === ФУНКЦИИ РАБОТЫ С LOCALSTORAGE ===

function saveTermList(terms) {
  try {
    localStorage.setItem("termList", JSON.stringify(terms));
    debugLog("Термины успешно сохранены в localStorage", { count: terms.length });
  } catch (error) {
    console.error("Критическая ошибка при сохранении в localStorage:", error);
  }
}

function restoreTermList() {
  try {
    const rawTermList = localStorage.getItem("termList");
    if (!rawTermList) {
      debugLog("localStorage пуст, инициализируем пустой список терминов");
      return [];
    }
    const parsedTerms = JSON.parse(rawTermList);
    debugLog("Успешно восстановлены термины из localStorage", { count: parsedTerms.length });
    return parsedTerms;
  } catch (error) {
    console.error("Ошибка парсинга данных из localStorage:", error);
    alert("Обнаружены повреждённые данные в localStorage. Список терминов сброшен.");
    return [];
  }
}

let terms = restoreTermList();

function syncTermList() {
  saveTermList(terms);
  reactRoot.render(<App />);
}

const reactRoot = createRoot(document.getElementById('root'));
reactRoot.render(<App />);

// === ФУНКЦИИ УПРАВЛЕНИЯ ДАННЫМИ ===

function validateTermData(title, description) {
  const errors = [];
  if (!title || title.trim().length === 0) {
    errors.push("Поле 'Название термина' не может быть пустым");
  } else if (title.trim().length < 2) {
    errors.push("Название термина должно содержать минимум 2 символа");
  }
  if (!description || description.trim().length === 0) {
    errors.push("Поле 'Описание' не может быть пустым");
  } else if 
  (description.trim().length < 2) {
    errors.push("Описание должно содержать минимум 2 символа");
  }
  return errors;
}


function addTerm(termData) {
  debugLog("Запуск функции добавления нового термина", termData);
  const { title, description, discount, image } = termData; // Добавляем discount
  const validationErrors = validateTermData(title, description);
  if (validationErrors.length > 0) {
    debugLog("Валидация не пройдена — обнаружены ошибки", validationErrors);
    alert(`Ошибка добавления термина:\n${validationErrors.join('\n')}`);
    return false;
  }
  const cleanTitle = title.trim();
  const cleanDescription = description.trim();
  terms.push({
    id: Date.now(),
    title: cleanTitle,
    description: cleanDescription,
    discount: discount, // Сохраняем скидку
    image: image
  });
  terms.sort((term1, term2) => (term1.title < term2.title ? -1 : 1));
  debugLog("Новый термин успешно добавлен и список отсортирован", { newCount: terms.length });
  syncTermList();
  return true;
}


function deleteItem(id) {
  debugLog("Запуск функции удаления термина", { id });
  const termToDelete = terms.find(term => term.id === id);
  if (termToDelete) {
    terms = terms.filter((term) => term.id !== id);
    debugLog("Термин успешно удалён", {
      deletedTitle: termToDelete.title,
      remainingCount: terms.length
    });
    syncTermList();
  } else {
    console.warn("Попытка удалить несуществующий термин с ID:", id);
  }
}

// === ЯВНЫЙ ЭКСПОРТ СУЩНОСТЕЙ ===
export { addTerm, deleteItem, terms, syncTermList };
