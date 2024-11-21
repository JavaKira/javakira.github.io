var BackButton = window.Telegram.WebApp.BackButton;
BackButton.show();
window.Telegram.WebApp.onEvent('backButtonClicked', () => {
    window.Telegram.WebApp.showAlert("Нет пути назад!");
    BackButton.hide();
})