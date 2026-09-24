import { useState } from "react";
import { sendMessage } from "../api/greenApi";

function MessageForm({ idInstance, apiTokenInstance }) {
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setIsLoading(true);

    try {
      await sendMessage(idInstance, apiTokenInstance, chatId, message);
      setStatus("Сообщение отправлено!");
      setMessage("");
    } catch (err) {
      console.error("Ошибка отправки:", err);
      const statusCode = err?.response?.status;
      if (statusCode === 401) {
        setStatus("Неверные ключи доступа.");
      } else if (statusCode === 466) {
        setStatus("Инстанс выключен или превышен лимит.");
      } else {
        setStatus("Не удалось отправить. Проверьте номер и соединение.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="message-form">
      <h3>Отправить сообщение</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Номер получателя (79991112233@c.us)"
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
          required
        />
        <textarea
          placeholder="Текст сообщения"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Отправляем..." : "Отправить"}
        </button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

export default MessageForm;
