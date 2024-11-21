let tg = window.Telegram.WebApp;
var BackButton = tg.BackButton;
BackButton.show();
BackButton.onClick(function() {
  WebApp.showAlert("Нет пути назад!");
  BackButton.hide();
});