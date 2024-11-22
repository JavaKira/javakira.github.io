// Функция для получения GET-параметров из URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Функция для загрузки артикулов из API
async function loadArticlesByCategory(categoryName) {
    try {
        // URL API
        const apiUrl = `https://vcodetsev.ru:447/api/articles?categoryName=${encodeURIComponent(categoryName)}`;
        
        // Запрос к API
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        // Парсим ответ
        const articles = await response.json();

        // Получаем контейнер для каталога
        const catalog = document.getElementById('catalog');
        catalog.innerHTML = ''; // Очищаем каталог перед добавлением новых артикулов

        // Если артикулов нет, показываем сообщение
        if (articles.length === 0) {
            catalog.innerHTML = '<p>Нет доступных артикулов в этой категории.</p>';
            return;
        }

        // Генерируем элементы для каждого артикула
        articles.forEach(article => {
            const catalogItem = document.createElement('div');
            catalogItem.className = 'catalog-item-column';

            const catalogImg = document.createElement('img');
            catalogImg.className = 'catalog-home-img';
            catalogImg.src = article.thumbnailURL || '/img/default-thumbnail.jpg';
            catalogImg.alt = article.title || 'Изображение';

            const catalogContainer = document.createElement('div');
            catalogContainer.className = 'catalog-home-container';

            const catalogTitle = document.createElement('h3');
            catalogTitle.textContent = article.title || 'Без названия';

            const catalogDescription = document.createElement('p');
            catalogDescription.textContent = article.shortDescription || 'Описание отсутствует';

            catalogContainer.appendChild(catalogTitle);
            catalogContainer.appendChild(catalogDescription);
            catalogItem.appendChild(catalogImg);
            catalogItem.appendChild(catalogContainer);
            catalog.appendChild(catalogItem);
        });
    } catch (error) {
        console.error('Не удалось загрузить артикулы:', error);

        const catalog = document.getElementById('catalog');
        catalog.innerHTML = '<p>Ошибка загрузки данных. Попробуйте позже.</p>';
    }
}

// Функция для обновления названия категории на странице
async function updateCategoryInfo(categoryName) {
    // URL API
    const apiUrl = `https://vcodetsev.ru:447/api/category?name=${encodeURIComponent(categoryName)}`;
        
    // Запрос к API
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
    }

    // Парсим ответ
    const category = await response.json();

    const categoryTitle = document.getElementById('category-title');
    const categoryBreadcrumb = document.getElementById('category-name');
    
    categoryTitle.textContent = category.title;
    categoryBreadcrumb.textContent = category.title;
}

// Основной запуск
document.addEventListener('DOMContentLoaded', () => {
    const categoryName = getQueryParam('name'); // Получаем название категории из GET-параметров

    if (categoryName) {
        updateCategoryInfo(categoryName); // Обновляем название категории
        loadArticlesByCategory(categoryName); // Загружаем артикулы
    } else {
        console.error('Название категории не указано.');
        document.getElementById('catalog').innerHTML = '<p>Категория не указана.</p>';
    }
});
