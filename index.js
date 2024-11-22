// Функция для загрузки категорий
async function loadCategories() {
    try {
        // Запрос к API для получения категорий
        const response = await fetch('https://vcodetsev.ru:447/api/categories');
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        // Парсим ответ в JSON
        const categories = await response.json();

        // Находим контейнер с ID "catalog"
        const catalog = document.getElementById('catalog');

        // Удаляем предзаполненные элементы (если нужно)
        catalog.innerHTML = '';

        // Генерируем элементы каталога
        categories.forEach(category => {
            const catalogItem = document.createElement('div');
            catalogItem.className = 'catalog-item';
            catalogItem.onclick = () => location.href = `/category.html?name=${encodeURIComponent(category.name)}`;

            const catalogImg = document.createElement('img');
            catalogImg.className = 'catalog-img';
            catalogImg.src = category.iconURL || '/img/default-icon.svg';
            catalogImg.alt = category.title || 'Категория';

            const catalogTitle = document.createElement('p');
            catalogTitle.textContent = category.title || 'Без названия';

            catalogItem.appendChild(catalogImg);
            catalogItem.appendChild(catalogTitle);
            catalog.appendChild(catalogItem);
        });
    } catch (error) {
        console.error('Не удалось загрузить категории:', error);
    }
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', loadCategories);
