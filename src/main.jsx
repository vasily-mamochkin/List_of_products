import './index.css';
import { createRoot } from 'react-dom/client';
// import { TermList } from './TermList';
import { App } from './App';
// === НАСТРОЙКИ И ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===

// Флаг режима отладки — позволяет быстро включить/выключить все отладочные сообщения
// Для отключения логов достаточно изменить значение на false
const DEBUG_MODE = true;

/**
 * Универсальная функция для вывода отладочных сообщений в консоль
 * @param {string} message — текстовое сообщение для логирования
 * @param {*} data — дополнительные данные для отображения (опционально)
 * @returns {void}
 */
function debugLog(message, data = null) {
  if (DEBUG_MODE) {
    console.log(`[DEBUG] ${message}`, data || '');
  }
}

// === ФУНКЦИИ РАБОТЫ С LOCALSTORAGE ===

/**
 * Сохраняет список терминов в localStorage браузера
 * Преобразует массив объектов в JSON-строку для хранения
 * @param {Array} terms — массив терминов для сохранения
 * @returns {void}
 */
function saveTermList(terms) {
  try {
    localStorage.setItem("termList", JSON.stringify(terms));
    debugLog("Термины успешно сохранены в localStorage", { count: terms.length });
  } catch (error) {
    // Обработка ошибок localStorage (например, переполнения)
    console.error("Критическая ошибка при сохранении в localStorage:", error);
  }
}

/**
 * Восстанавливает список терминов из localStorage
 * Если данных нет или они повреждены, возвращает пустой массив
 * @returns {Array} — массив терминов или пустой массив при ошибке
 */
function restoreTermList() {
  try {
    const rawTermList = localStorage.getItem("termList");

    // Если в localStorage нет данных по ключу "termList"
    if (!rawTermList) {
      debugLog("localStorage пуст, инициализируем пустой список терминов");
      return [];
    }

    // Парсим JSON-строку обратно в массив объектов
    const parsedTerms = JSON.parse(rawTermList);
    debugLog("Успешно восстановлены термины из localStorage", { count: parsedTerms.length });
    return parsedTerms;
  } catch (error) {
    // Обработка ошибок парсинга JSON (повреждённые данные)
    console.error("Ошибка парсинга данных из localStorage:", error);
    alert("Обнаружены повреждённые данные в localStorage. Список терминов сброшен.");
    return []; // Возвращаем пустой массив при критической ошибке
  }
}

// Инициализируем переменную terms — восстанавливаем данные при загрузке страницы
let terms = restoreTermList();

/**
 * Синхронизирует состояние приложения:
 * 1. Сохраняет текущие термины в localStorage
 * 2. Перерисовывает компонент TermList с обновлёнными данными
 * @returns {void}
 */
// function syncTermList() {
//   saveTermList(terms);
//   reactRoot.render(<TermList terms={terms} onDelete={deleteItem} />);
//   debugLog("Компонент TermList отрендерен с обновлённым списком терминов", { termsCount: terms.length });
// }
// Обновляем функцию syncTermList — теперь она рендерит App
function syncTermList() {
  saveTermList(terms);
  reactRoot.render(<App />);
}

const reactRoot = createRoot(document.getElementById('root'));
reactRoot.render(<App />);


// === ФУНКЦИИ УПРАВЛЕНИЯ ДАННЫМИ ===

/**
 * Проверяет корректность данных нового термина перед добавлением
 * @param {string} title — название термина
 * @param {string} description — описание термина
 * @returns {Array} — массив сообщений об ошибках (пустой, если валидация пройдена)
 */
function validateTermData(title, description) {
  const errors = [];

  // Проверка поля "Название термина"
  if (!title || title.trim().length === 0) {
    errors.push("Поле 'Название термина' не может быть пустым");
  } else if (title.trim().length < 2) {
    errors.push("Название термина должно содержать минимум 2 символа");
  }

  // Проверка поля "Описание"
  if (!description || description.trim().length === 0) {
    errors.push("Поле 'Описание' не может быть пустым");
  } else if (description.trim().length < 10) {
    errors.push("Описание должно содержать минимум 10 символов");
  }

  return errors;
}

/**
 * Добавляет новый термин в список
 * Выполняет валидацию, очистку данных, сортировку и синхронизацию
 * @param {string} title — название термина
 * @param {string} description — описание термина
 * @returns {boolean} — true при успешном добавлении, false при ошибке валидации
 */
function addTerm(title, description) {
  debugLog("Запуск функции добавления нового термина", { title, description });

  // Валидируем входные данные
  const validationErrors = validateTermData(title, description);

  if (validationErrors.length > 0) {
    debugLog("Валидация не пройдена — обнаружены ошибки", validationErrors);
    // Показываем пользователю понятные сообщения об ошибках
    alert(`Ошибка добавления термина:\n${validationErrors.join('\n')}`);
    return false;
  }

  // Очищаем данные от лишних пробелов
  const cleanTitle = title.trim();
  const cleanDescription = description.trim();

  // Создаём новый объект термина с уникальным ID
  terms.push({
    id: Date.now(), // Уникальный ID на основе текущего времени в миллисекундах
    title: cleanTitle,
    description: cleanDescription,
  });

  // Сортируем список терминов по алфавиту (по полю title)
  terms.sort((term1, term2) => (term1.title < term2.title ? -1 : 1));
  debugLog("Новый термин успешно добавлен и список отсортирован", { newCount: terms.length });

  // Сохраняем в localStorage и обновляем интерфейс
  syncTermList();
  return true;
}

/**
 * Удаляет термин из списка по его ID
 * @param {number} id — уникальный идентификатор термина для удаления
 * @returns {void}
 */
function deleteItem(id) {
  debugLog("Запуск функции удаления термина", { id });

  // Находим удаляемый термин для логирования
  const termToDelete = terms.find(term => term.id === id);

  if (termToDelete) {
    // Фильтруем массив, исключая элемент с указанным ID
    terms = terms.filter((term) => term.id !== id);
    debugLog("Термин успешно удалён", {
      deletedTitle: termToDelete.title,
      remainingCount: terms.length
    });
    // Сохраняем изменения и обновляем интерфейс
    syncTermList();
  } else {
    // Предупреждение для разработчика — попытка удалить несуществующий элемент
    console.warn("Попытка удалить несуществующий термин с ID:", id);
  }
}

// === ИНИЦИАЛИЗАЦИЯ И ОБРАБОТЧИКИ СОБЫТИЙ ===

// Получаем DOM-элемент, в который будем монтировать React-приложение
const descriptionList = document.getElementById("description-list");

// Создаём корень React-приложения — точка монтирования компонента
// const reactRoot = createRoot(descriptionList);

// ВАЖНО: выполняем начальный рендер с восстановленными из localStorage данными
debugLog("Инициализация приложения завершена", { initialTermsCount: terms.length });
syncTermList(); // Первый рендер: показываем сохранённые термины

// Получаем форму добавления терминов из DOM
const form = document.getElementById('add-description');

// Добавляем обработчик события отправки формы
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Отменяем стандартную отправку формы (перезагрузку страницы)

  // Извлекаем значения полей формы
  const title = form.elements['title'].value;
  const description = form.elements['description'].value;

  debugLog("Форма отправлена пользователем", { title, description });

  // Пытаемся добавить термин — функция вернёт false при ошибке валидации
  const success = addTerm(title, description);

  if (success) {
    form.reset(); // Очищаем поля формы после успешного добавления
    debugLog("Форма успешно сброшена после добавления термина");
  }
  // Если добавление не удалось, форма остаётся заполненной для исправления ошибок
});

// Экспортируем необходимые функции и данные для использования в других компонентах
export { addTerm, deleteItem, terms, syncTermList };

