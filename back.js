let tg = window.Telegram.WebApp;
var BackButton = tg.BackButton;
BackButton.show();
Telegram.WebApp.onEvent('backButtonClicked', () => {
    WebApp.showAlert("Нет пути назад!");
    BackButton.hide();
})