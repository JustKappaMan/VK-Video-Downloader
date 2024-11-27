# VK Video Downloader
![MIT License](https://img.shields.io/github/license/JustKappaMan/VK-Video-Downloader)
![Version 1.1.10](https://img.shields.io/badge/version-1.1.10-blue)
![Checked with ESLint](https://img.shields.io/badge/ESLint-checked-blueviolet)

Относительно недавно просмотр видео в VK на бюджетных устройствах (особенно в приложении) стал невозможен по ряду причин:
* Постоянные ошибки
* Низкая частота кадров при качестве 720p и выше
* Графические артефакты при качестве 480p и ниже

Я решил воспользоваться безотказным методом — скачивать видео и смотреть их локально. Каждый раз вытаскивать ссылки руками, путаясь в качестве видео, оказалось неудобно. Так и родилось это расширение.

## Как установить
* Браузеры на основе Chromium
  * Cкачайте [архив с исходным кодом](https://codeload.github.com/JustKappaMan/VK-Video-Downloader/zip/refs/heads/main), распакуйте скачанный архив
  * Откройте в браузере раздел __Расширения__
  * Активируйте __Режим разработчика__ (если такая функция имеется)
  * Нажмите __Загрузить распакованное__ (или нечто подобное)
  * Выберите папку __chromium__ из распакованного архива
* Любые браузеры с поддержкой Tampermonkey/Greasemonkey/Violentmonkey
  * Создайте в расширении новый скрипт, __удалите из него стартовый код__
  * Скопируйте в него содержимое файла [monkeys/scripts/desktop.js](https://github.com/JustKappaMan/VK-Video-Downloader/blob/main/monkeys/scripts/desktop.js) и сохраните его
  * Создайте в расширении новый скрипт, __удалите из него стартовый код__
  * Скопируйте в него содержимое файла [monkeys/scripts/mobile.js](https://github.com/JustKappaMan/VK-Video-Downloader/blob/main/monkeys/scripts/mobile.js) и сохраните его

## Как пользоваться
* Откройте любое видео на [vk.com](https://vk.com) или [m.vk.com](https://m.vk.com)
* Кликните по одной из появившихся в левом нижнем углу браузера ссылок для скачивания
* Наслаждайтесь локальным просмотром видео в желаемом качестве 🥳

## Благодарность
* [Rizki Ahmad Fauzi](https://www.flaticon.com/authors/rizki-ahmad-fauzi) за иконки
* [SpukiBugi](https://github.com/SpukiBugi) за помощь после очередного обновления VK

## Информация о лицензии
Продукт распространяется под лицензией MIT.
