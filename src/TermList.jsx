import { TermCard } from "./TermCard";
import "./TermList.css";
// Для переиспользования кода вместо его дублирования создадим переменную с массивом терминов.(удалим этот статичный список когда создадим переменную для сохранения списка терминов в main.jsx ) 
// const terms = [
//     {
//         title: "React",
//         description: "Библиотека для создания пользовательских интерфейсов",
//     },
//     {
//         title: "React-компонент",
//         description: "Функция, возвращающая React-элемент",   
//     },
//     {
//         title: "Render", 
//     },
// ]
// Компонент TermList обрабатывает входящий прор terms
export const TermList =  ({ terms, onDelete }) => {
    return (
        <ul className="term-list">
            {/* jsx-разметка может содержать массивы по этому достаточно
             преобразовать массив с терминами в массив jsx элементов с помощью метода мап */}
            {terms.map((item) => (
            <li className="term-list__item" key={item.id} >
                <TermCard
                title={item.title}
                description={item.description}
                onDelete={onDelete}
                id={item.id}
                 />
            </li>
            ))}
        </ul>
    );
};