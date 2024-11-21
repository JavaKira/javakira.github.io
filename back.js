var BackButton = window.Telegram.WebApp.BackButton;
BackButton.show();
window.Telegram.WebApp.onEvent('backButtonClicked', () => {
    location.href = "/"
    BackButton.hide();
})