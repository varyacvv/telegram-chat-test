# Telegram Chat Test

Веб-интерфейс для отправки и получения сообщений в Telegram через [GREEN-API](https://green-api.com/telegram/).

Проект развернут на **Render**: https://telegram-chat-test-o73z.onrender.com/

## Описание

SPA-приложение на React, которое позволяет авторизоваться с ключами GREEN-API, отправлять текстовые сообщения и получать входящие в реальном времени.

## Стек

- React
- Vite
- Axios
- GREEN-API (Telegram)

## Что реализовано

- Авторизация через `getSettings` с обработкой ошибок
- Отправка сообщений через `sendMessage`
- Получение сообщений через `receiveNotification` + `deleteNotification` (long polling)
- Сохранение сессии в `localStorage`
- Автоскролл к новому сообщению

## Структура проекта

```text
src/
├── api/
│   └── greenApi.js        # запросы к GREEN-API
├── components/
│   ├── AuthForm.jsx       # форма ввода ключей
│   ├── Chat.jsx           # контейнер чата
│   └── MessageForm.jsx    # форма отправки
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Запуск

```bash
git clone https://github.com/varyacvv/telegram-chat-test.git
cd telegram-chat-test
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`.

## Ключи GREEN-API

1. Зарегистрироваться в [личном кабинете](https://console.green-api.com/).
2. Создать инстанс для Telegram.
3. Активировать инстанс.
4. Скопировать `idInstance` и `apiTokenInstance`.
5. Ввести их в форму авторизации.
