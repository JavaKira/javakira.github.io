// Функция для получения GET-параметра из URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Функция для загрузки данных о статье
async function loadArticle(articleId) {
    try {
        // URL API
        const apiUrl = `https://vcodetsev.ru:447/api/article/${articleId}`;

        // Запрос к API
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        // Парсим ответ
        const article = await response.json();

        // Обновляем хлебные крошки
        const breadcrumbs = document.getElementById('breadcrumbs');
        const categoryLink = document.getElementById('category-link');
        const articleTitle = document.getElementById('article-title');
        categoryLink.href = `/category.html?name=${encodeURIComponent(article.categoryName)}`;
        categoryLink.textContent = article.articleCategory || 'Категория';
        articleTitle.textContent = article.title;

        // Обновляем заголовок и изображение
        const articleName = document.getElementById('article-name');
        const articleImage = document.getElementById('article-image');
        articleName.textContent = article.title || 'Без названия';
        articleImage.src = article.thumbnailURL || '/img/default-image.jpg';
        articleImage.alt = article.title || 'Изображение статьи';

        // Обновляем контент
        const articleContent = document.getElementById('article-content');
        articleContent.innerHTML = `
            <p>${article.content || 'Описание отсутствует.'}</p>
            <ul>
                <li>✔️ Контакт в Telegram: <a href="https://t.me/${article.telegramContact}" target="_blank">${article.telegramContact}</a></li>
            </ul>
        `;
    } catch (error) {
        console.error('Не удалось загрузить статью:', error);

        const articleContent = document.getElementById('article-content');
        articleContent.innerHTML = '<p>Ошибка загрузки данных. Попробуйте позже.</p>';
    }
}

// Основной запуск
document.addEventListener('DOMContentLoaded', () => {
    const articleId = getQueryParam('id'); // Получаем ID статьи из GET-параметров

    if (articleId) {
        loadArticle(articleId); // Загружаем данные о статье
    } else {
        console.error('ID статьи не указан.');
        const articleContent = document.getElementById('article-content');
        articleContent.innerHTML = '<p>ID статьи не указан.</p>';
    }
});
