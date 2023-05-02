# VK Video Downloader
![MIT License](https://img.shields.io/github/license/JustKappaMan/VK-Video-Downloader)
![Version 1.1.5](https://img.shields.io/badge/version-1.1.5-blue)
![Checked with ESLint](https://img.shields.io/badge/ESLint-checked-blueviolet)

VK — хранилище интересного мне видеоконтента. Относительно недавно просмотр видео на бюджетных устройствах (особенно в приложении) стал невозможен по ряду причин:
* Постоянные ошибки
* Низкая частота кадров при качестве 720p и выше
* Графические артефакты при качестве 480p и ниже

Я решил воспользоваться безотказным методом — качать видео и смотреть их локально. Каждый раз вытаскивать ссылки руками, путаясь в качестве видео, оказалось неудобно. Так и родилось это расширение.
## Информация о лицензии
Продукт распространяется под лицензией MIT.

Иконки предоставлены [Rizki Ahmad Fauzi](https://www.flaticon.com/authors/rizki-ahmad-fauzi).
## Как установить
* Браузеры на основе Chromium
  * Нажмите __Code__ или [вот сюда](https://codeload.github.com/JustKappaMan/VK-Video-Downloader/zip/refs/heads/main), скачайте архив с исходным кодом, распакуйте скачанный архив
  * Откройте в браузере раздел __Расширения__
  * Активируйте __Режим разработчика__ (если такая функция имеется)
  * Нажмите __Загрузить распакованное__ (или нечто подобное)
  * Выберите папку __chromium__ из распакованного архива
* Любые браузеры с поддержкой Tampermonkey/Greasemonkey/Violentmonkey
  * Создайте в расширении новый скрипт, __удалите из него стартовый код__
  * Скопируйте в него содержимое файла [monkeys/scripts/desktop.js](https://github.com/JustKappaMan/VK-Video-Downloader/blob/main/monkeys/scripts/desktop.js) и сохраните его
  * Создайте в расширении новый скрипт, __удалите из него весь стартовый код__
  * Скопируйте в него содержимое файла [monkeys/scripts/mobile.js](https://github.com/JustKappaMan/VK-Video-Downloader/blob/main/monkeys/scripts/mobile.js) и сохраните его
## Как пользоваться
* Откройте любое видео на [vk.com](https://vk.com/) или [m.vk.com](https://m.vk.com/)
* Кликните по одной из появившихся под плеером ссылок для скачивания
* Наслаждайтесь локальным просмотром видео в желаемом качестве 🥳